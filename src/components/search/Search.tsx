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
            className={cn("relative z-50 mb-6 w-full max-w-2xl mx-auto", className)}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="group flex h-12 items-center gap-3 rounded-full border border-blue-100 bg-white px-4 shadow-md shadow-gray-200/40 transition-all focus-within:border-blue-300">
                <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                    type="text"
                    className="h-full w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
                    placeholder="Search for help, articles, and more..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (query) setIsOpen(true); }}
                />
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-lg shadow-gray-200/50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <ul className="max-h-[60vh] overflow-y-auto py-2 pr-2">
                        {results.map((result) => (
                            <li key={result.item.slug}>
                                <Link
                                    href={`/${result.item.slug}`}
                                    className="flex items-start gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-1 items-start gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {result.item.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                                                {result.item.description}
                                            </p>
                                        </div>
                                        <span className="mt-1 ml-auto shrink-0 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
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
