import { getArticleBySlug, getAllArticles } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

// Allow static generation of all article pages
export async function generateStaticParams() {
    const articles = getAllArticles();
    return articles.map((article) => ({
        // slug is stored as "category/article", so split it
        slug: article.slug.split("/"),
    }));
}

export default async function ArticlePage(props: { params: Promise<{ slug: string[] }> }) {
    const params = await props.params;
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    // Simple Breadcrumbs
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: article.category, href: "#" }, // Category page not implemented yet
        { label: article.title, href: `/${article.slug}` },
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Breadcrumbs Area */}
            <div className="bg-gray-50 border-b border-gray-100 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center text-sm text-gray-500 mb-4">
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
                    <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                    <p className="mt-2 text-gray-500">{article.description}</p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar (Desktop) */}
                <aside className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            In this Article
                        </h3>
                        {/* 
                   Ideally we parse headings from MDX. 
                   For now, hardcoding a simple placeholder or valid MDX headers would be better,
                   but let's just show a "On this page" placeholder to match requirements visually. 
                */}
                        <ul className="space-y-3 border-l-2 border-gray-100">
                            <li className="pl-4 border-l-2 border-blue-600 -ml-0.5 text-blue-600 font-medium text-sm">
                                Overview
                            </li>
                            <li className="pl-4 text-gray-500 hover:text-gray-900 text-sm cursor-pointer">
                                Details
                            </li>
                            <li className="pl-4 text-gray-500 hover:text-gray-900 text-sm cursor-pointer">
                                Related Topics
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <article className="prose prose-blue prose-lg max-w-none flex-1">
                    <MDXRemote source={article.content} />
                </article>

                {/* Right Sidebar / Feedback (Desktop) or Bottom (Mobile) */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-2">Was this helpful?</h4>
                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm">
                                <ThumbsUp className="w-4 h-4" /> Yes
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm">
                                <ThumbsDown className="w-4 h-4" /> No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
