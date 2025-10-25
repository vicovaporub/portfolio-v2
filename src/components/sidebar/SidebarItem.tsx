import { SidebarItemProps } from "@/types/sidebar";

export default function SidebarItem({
    item,
    depth,
    isExpanded,
    onToggle,
    onClick,
    expandedItems,
}: SidebarItemProps) {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.isActive;
    const depthPadding =
    depth <= 0 ? "pl-2" : depth === 1 ? "pl-2" : depth === 2 ? "pl-4" : "pl-11";

    return (
        <div>
            <div
                className={`
          flex items-center pr-2 py-1 text-xs cursor-pointer transition-all duration-150 select-none theme-transition
          ${depthPadding}
          ${
        isActive
            ? "text-[var(--accent-blue)] font-medium"
            : "text-[var(--text-secondary)] hover:text-[var(--accent-blue)]"
        }
          ${depth === 0 ? "font-semibold tracking-wide" : "font-normal"}
        `}
                onClick={() => {
                    if (hasChildren) {
                        if (item.id !== "nav-menu") onToggle(item.id);
                        onClick(item);
                    } else {
                        onClick(item);
                    }
                }}
            >
                {hasChildren && item.id !== "nav-menu" && (
                    <span
                        className={`mr-1.5 text-[8px] transition-transform duration-150 ${
                            isExpanded ? "rotate-90" : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </span>
                )}
                <span className="mr-2 text-[10px] opacity-70">{item.icon}</span>
                <span
                    className={`truncate ${depth === 0 ? "text-[10px]" : "text-[10px]"}`}
                >
                    {item.label}
                </span>
            </div>
            {hasChildren && isExpanded && (
                <div className="ml-2 border-l border-[var(--border)]/30">
                    {item.children!.map((child) => (
                        <SidebarItem
                            key={child.id}
                            item={child}
                            depth={depth + 1}
                            isExpanded={expandedItems?.has(child.id) || false}
                            onToggle={onToggle}
                            onClick={onClick}
                            expandedItems={expandedItems}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
