import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ThumbsUp, ThumbsDown, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tabs, Tab } from "@/components/mdx/Tabs";
import { Accordion, AccordionItem } from "@/components/mdx/Accordion";

// Category slug to display name mapping
const CATEGORY_LABELS: Record<string, string> = {
    setup: "Setup & Installation",
    features: "Features & Gestures",
    customization: "Customization",
    troubleshooting: "Troubleshooting",
    privacy: "Privacy & Safety",
    "creative-tools": "Creative Tools",
};

// Allow static generation of all article and category pages
export async function generateStaticParams() {
    const articles = getAllArticles();
    const params = [];

    // Add all article pages
    articles.forEach((article) => {
        params.push({
            slug: article.slug.split("/"),
        });
    });

    // Add category pages (one slug element)
    const categories = new Set(articles.map((a) => a.slug.split("/")[0]));
    categories.forEach((category) => {
        params.push({
            slug: [category],
        });
    });

    return params;
}

// Category Landing Page Component
function CategoryPage({
    categorySlug,
    articleCount,
    articles,
}: {
    categorySlug: string;
    articleCount: number;
    articles: ReturnType<typeof getAllArticles>;
}) {
    const categoryName = CATEGORY_LABELS[categorySlug] || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);
    const categoryArticles = articles.filter((a) => a.slug.startsWith(`${categorySlug}/`));

    const categoryDescriptions: Record<string, string> = {
        setup: "Get Flashboard installed and running on your Android device.",
        features: "Explore powerful gestures, voice input, and keyboard features.",
        customization: "Personalize your keyboard with themes and settings.",
        troubleshooting: "Solutions to common issues and frequently asked questions.",
        privacy: "Learn how we protect your data and privacy.",
        "creative-tools": "Express yourself with ASCII art, emoticons, and decorative text elements.",
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-100 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <span className="font-semibold text-gray-900">{categoryName}</span>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
                    <p className="mt-2 text-gray-500">{categoryDescriptions[categorySlug] || ""}</p>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryArticles.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/${article.slug}`}
                            className="group flex flex-col p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {article.title}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 flex-1">{article.description}</p>
                            <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                Read More <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const articles = getAllArticles();

    // Handle category pages (single slug element)
    if (params.slug.length === 1) {
        const categorySlug = params.slug[0];
        const categoryArticles = articles.filter((a) => a.slug.startsWith(`${categorySlug}/`));

        if (categoryArticles.length > 0) {
            return <CategoryPage categorySlug={categorySlug} articleCount={categoryArticles.length} articles={articles} />;
        }

        notFound();
    }

    // Handle article pages (two slug elements)
    if (params.slug.length !== 2) {
        notFound();
    }

    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // Simple Breadcrumbs
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: article.category, href: `/${params.slug[0]}` },
        { label: article.title, href: `/${article.slug}` },
    ];

    const relatedArticles = articles
        .filter((item) => item.category === article.category && item.slug !== article.slug)
        .slice(0, 6);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-6 py-6">
                    <nav className="flex items-center text-sm text-gray-500 mb-3">
                        {breadcrumbs.map((crumb, index) => (
                            <div key={crumb.label} className="flex items-center">
                                {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
                                <Link
                                    href={crumb.href}
                                    className={`hover:text-blue-600 transition-colors ${index === breadcrumbs.length - 1 ? "font-semibold text-gray-900 pointer-events-none" : ""}`}
                                >
                                    {crumb.label}
                                </Link>
                            </div>
                        ))}
                    </nav>
                    <h1 className="text-3xl font-semibold text-gray-900">{article.title}</h1>
                    <p className="mt-1 text-base font-normal text-gray-600">{article.description}</p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
                        {/* Main Content */}
                        <article className="prose prose-blue max-w-none text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900 prose-h2:text-gray-900 prose-h3:text-gray-900 prose-a:text-blue-600 prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-li:leading-7 prose-ul:mt-4 prose-ol:mt-4 prose-ul:pl-5 prose-ol:pl-5 prose-li:my-1 prose-a:no-underline hover:prose-a:underline">
                            <MDXRemote
                                source={article.content}
                                components={{ Tabs, Tab, Accordion, AccordionItem }}
                            />
                        </article>

                        {/* Feedback */}
                        <div className="pt-6">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
                            >
                                <MessageSquare className="h-4 w-4" />
                                Give feedback about this article
                            </Link>
                        </div>
                    </div>

                    {/* Right Rail */}
                    <aside className="hidden lg:block">
                        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-900">Help</h3>
                            <div className="mt-4 space-y-3">
                                {relatedArticles.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={`/${item.slug}`}
                                        className="flex items-start gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        <span className="mt-0.5 text-blue-600">
                                            <FileText className="h-4 w-4" />
                                        </span>
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                                {relatedArticles.length === 0 && (
                                    <p className="text-sm text-gray-500">No related articles yet.</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
