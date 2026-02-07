import Link from "next/link";
import {
    Settings,
    Palette,
    Zap,
    HelpCircle,
    Shield,
    ArrowRight
} from "lucide-react";

const CATEGORIES = [
    {
        title: "Setup & Installation",
        slug: "setup",
        description: "Get started with Flashboard on your device.",
        icon: Settings,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Customization",
        slug: "customization",
        description: "Themes, layouts, and visual tweaks.",
        icon: Palette,
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        title: "Features & Gestures",
        slug: "features",
        description: "Master the power tools and shortcuts.",
        icon: Zap,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    {
        title: "Troubleshooting",
        slug: "troubleshooting",
        description: "Solutions to common issues.",
        icon: HelpCircle,
        color: "text-red-600",
        bg: "bg-red-50",
    },
    {
        title: "Privacy & Safety",
        slug: "privacy",
        description: "How we protect your data.",
        icon: Shield,
        color: "text-green-600",
        bg: "bg-green-50",
    },
];

export function CategoryGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.slug}
                            href={`#`} // Note: We haven't implemented category pages yet, ideally this links to /category/[slug] or we just list articles here.
                            // For now, let's link to the first article of that category if possible, or just a placeholder.
                            // Actually, checking the content structure, we have folders.
                            // Let's assume for now we might want a category index page, but the plan didn't explicitly implement one.
                            // I'll leave it as a dead link '#' or maybe a search filter link in future?
                            // Updated Plan: Let's make these cards just visual navigational aids that perhaps scroll or map to sections?
                            // Standard Help Center practice: Link to a Category Landing Page.
                            // I will set href to `/category/${category.slug}` and we can implement that page later.
                            className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${category.bg} ${category.color}`}>
                                <category.icon className="w-6 h-6" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {category.title}
                            </h3>
                            <p className="text-gray-500 mb-8 flex-1">
                                {category.description}
                            </p>

                            <div className="flex items-center text-sm font-semibold text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                View Articles <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
