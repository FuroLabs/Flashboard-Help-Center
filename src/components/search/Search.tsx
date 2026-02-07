"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse, { type FuseResult } from "fuse.js";
import { Search as SearchIcon, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Define a type for the articles passed to the search component
// We only need the metadata for search
export type SearchableArticle = {
    slug: string;
    title: string;
    description: string;
    category: string;
};

interface SearchProps {
    articles: SearchableArticle[];
    className?: string;
}

export function Search({ articles, className }: SearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<FuseResult<SearchableArticle>[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const fuse = useMemo(() => {
        return new Fuse(articles, {
            keys: ["title", "description", "category"],
            threshold: 0.3,
            includeMatches: true,
        });
    }, [articles]);

    useEffect(() => {
        if (query.trim().length > 0) {
            setResults(fuse.search(query));
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query, fuse]);

    // Close search when clicking outside (simple implementation)
    // In a real app, use a dedicated hook or library for click-outside
    useEffect(() => {
        const handleClick = () => setIsOpen(false);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div
            className={cn("relative w-full max-w-2xl mx-auto", className)}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 border-0 rounded-2xl bg-white shadow-lg shadow-gray-200/50 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-lg transition-all"
                    placeholder="Search for help, articles, and more..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (query) setIsOpen(true); }}
                />
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <ul className="max-h-[60vh] overflow-y-auto py-2">
                        {results.map((result) => (
                            <li key={result.item.slug}>
                                <Link
                                    href={`/${result.item.slug}`}
                                    className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {result.item.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                            {result.item.description}
                                        </p>
                                        <span className="inline-block mt-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                            {result.item.category}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isOpen && query.length > 0 && results.length === 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-8 text-center z-50">
                    <p className="text-gray-500">No results found for "{query}"</p>
                </div>
            )}
        </div>
    );
}
