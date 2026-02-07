"use client";

import { useMemo, useState } from "react";
import type { ReactElement, ReactNode } from "react";

type TabProps = {
    label: string;
    children: ReactNode;
};

type TabsProps = {
    children: ReactNode;
    defaultIndex?: number;
};

export function Tab({ children }: TabProps) {
    return <>{children}</>;
}

export function Tabs({ children, defaultIndex = 0 }: TabsProps) {
    const tabs = useMemo(() => {
        const raw = Array.isArray(children) ? children : [children];
        return raw.filter((child): child is ReactElement<TabProps> => {
            return (
                typeof child === "object" &&
                child !== null &&
                "props" in child &&
                typeof (child as ReactElement<TabProps>).props?.label === "string"
            );
        });
    }, [children]);

    const safeDefault = tabs.length > 0 ? Math.min(defaultIndex, tabs.length - 1) : 0;
    const [activeIndex, setActiveIndex] = useState(safeDefault);

    if (tabs.length === 0) {
        return null;
    }

    return (
        <div className="mt-2">
            <div className="flex gap-6 border-b border-gray-200 text-sm font-semibold">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.props.label}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`-mb-px border-b-2 pb-2 transition-colors ${
                            index === activeIndex
                                ? "border-blue-600 text-blue-700"
                                : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        {tab.props.label}
                    </button>
                ))}
            </div>
            <div className="pt-6">{tabs[activeIndex]}</div>
        </div>
    );
}
