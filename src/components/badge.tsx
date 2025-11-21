import type { BadgeProps } from "@/types/badge";

const Badge = ({ className = "", children, ...rest }: BadgeProps) => {
    const baseClasses = "bg-[var(--border)] text-[var(--text-secondary)] rounded-md px-2 md:px-3 py-1 text-xs md:text-sm border border-[var(--border)]";
    return (
        <span className={`${baseClasses} ${className}`} {...rest}>
            {children}
        </span>
    );
};

export default Badge;


