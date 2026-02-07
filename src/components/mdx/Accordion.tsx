"use client";

import { useMemo, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItemProps = {
    title: string;
    children: ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
};

type AccordionProps = {
    children: ReactNode;
    defaultOpenIndex?: number;
};

export function AccordionItem({ title, children, isOpen = false, onToggle }: AccordionItemProps) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between gap-3 py-4 text-left font-semibold text-[#1a73e8] hover:bg-gray-50 transition-colors"
            >
                <span className="flex-1">{title}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-all duration-200 ${isOpen ? "rotate-180 text-[#1a73e8]" : "text-gray-500"}`} />
            </button>
            {isOpen && (
                <div className="pb-6 pt-2 prose prose-blue max-w-none">
                    {children}
                </div>
            )}
        </div>
    );
}

export function Accordion({ children, defaultOpenIndex = 0 }: AccordionProps) {
    const items = useMemo(() => {
        const raw = Array.isArray(children) ? children : [children];
        return raw.filter((child): child is ReactElement<AccordionItemProps> => {
            return (
                typeof child === "object" &&
                child !== null &&
                "props" in child &&
                typeof (child as ReactElement<AccordionItemProps>).props?.title === "string"
            );
        });
    }, [children]);

    const safeDefault = items.length > 0 ? Math.min(defaultOpenIndex, items.length - 1) : 0;
    const [openIndex, setOpenIndex] = useState(safeDefault);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="my-8">
            {items.map((item, index) => (
                <AccordionItem
                    key={item.props.title}
                    title={item.props.title}
                    isOpen={index === openIndex}
                    onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                >
                    {item.props.children}
                </AccordionItem>
            ))}
        </div>
    );
}
