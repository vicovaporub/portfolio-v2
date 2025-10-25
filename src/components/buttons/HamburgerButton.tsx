interface HamburgerButtonProps {
  onOpen: () => void;
  className?: string;
}

export default function HamburgerButton({ onOpen, className = "" }: HamburgerButtonProps) {
    return (
        <button
            className={`fixed top-3 left-3 z-40 bg-[var(--sidebar-bg)] border border-[var(--border)] rounded p-2 shadow-lg ${className}`}
            onClick={onOpen}
            aria-label="Abrir menu"
        >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        </button>
    );
} 