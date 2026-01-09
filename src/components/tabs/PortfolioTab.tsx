"use client";

import { PortfolioTabProps } from "@/types/tabs";

export default function PortfolioTab({
    tabs,
    onTabClose,
    onTabActivate,
}: PortfolioTabProps) {
    const getFileIcon = (title: string) => {
        if (title.endsWith(".md")) return "📄";
        if (title.endsWith(".tsx") || title.endsWith(".ts")) return "⚛️";
        if (title.endsWith(".json")) return "⚙️";
        if (title.endsWith("/")) return "📂";
        return "📄";
    };

    const renderContent = (content: string | React.ReactNode) => {
        if (typeof content === "string") {
            return (
                <div className="p-4">
                    <div className="bg-background-secondary rounded border border-border p-6 theme-transition">
                        <div className="text-[11px] text-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
                            {content}
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };

    return (
        <div className="flex-1 min-h-0 flex flex-col bg-background theme-transition">
            <div className="flex flex-wrap bg-tab-bg min-h-[35px] theme-transition">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`
              flex items-center px-4 py-2 cursor-default transition-all duration-150 select-none theme-transition
              border border-tab-border
              w-[155px]
              ${
                    tab.isActive
                        ? "bg-tab-active-bg text-text-primary"
                        : "bg-tab-bg text-text-secondary hover:text-text-primary hover:bg-tab-hover-bg"
                    }
            `}
                        onClick={() => onTabActivate?.(tab.id)}
                    >
                        <span className="mr-2 text-[10px] opacity-70">
                            {getFileIcon(tab.title)}
                        </span>
                        <span
                            className={`flex-1 min-w-0 truncate text-[11px] font-mono ${
                                tab.isActive
                                    ? "text-accent-blue"
                                    : "text-text-secondary"
                            }`}
                        >
                            {tab.title}
                        </span>
                        <button
                            className="ml-3 flex-shrink-0 w-4 h-4 rounded hover:bg-hover-bg flex items-center justify-center transition-colors cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onTabClose?.(tab.id);
                            }}
                        >
                            <span className="text-[12px] text-text-muted hover:text-text-primary">
                ×
                            </span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 min-h-0 overflow-auto sidebar-scrollbar">
                {tabs.map((tab) => (
                    <div key={tab.id} className={tab.isActive ? "" : "hidden"}>
                        {renderContent(tab.content)}
                    </div>
                ))}
            </div>
        </div>
    );
}
