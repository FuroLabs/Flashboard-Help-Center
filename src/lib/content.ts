import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Article = {
    slug: string;
    category: string;
    title: string;
    description: string;
    content: string;
    updatedAt: string;
};

const contentDirectory = path.join(process.cwd(), "content");

export function getAllArticles(): Article[] {
    const categories = fs.readdirSync(contentDirectory);
    const articles: Article[] = [];

    categories.forEach((category) => {
        const categoryPath = path.join(contentDirectory, category);
        if (!fs.statSync(categoryPath).isDirectory()) return;

        const files = fs.readdirSync(categoryPath);
        files.forEach((file) => {
            if (!file.endsWith(".mdx")) return;

            const filePath = path.join(categoryPath, file);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(fileContent);

            articles.push({
                slug: `${category}/${file.replace(".mdx", "")}`,
                category: data.category || category,
                title: data.title,
                description: data.description,
                updatedAt: data.updatedAt,
                content,
            });
        });
    });

    return articles;
}

export function getArticleBySlug(slug: string[]): Article | null {
    // slug is usually [category, articleName]
    if (slug.length !== 2) return null;

    const [category, articleName] = slug;
    const filePath = path.join(contentDirectory, category, `${articleName}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
        slug: `${category}/${articleName}`,
        category: data.category || category,
        title: data.title,
        description: data.description,
        updatedAt: data.updatedAt,
        content,
    };
}
