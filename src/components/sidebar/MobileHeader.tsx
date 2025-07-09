import ThemeToggle from '../buttons/ThemeToggle';
import LanguageToggle from '../buttons/LanguageToggle';

interface MobileHeaderProps {
  onOpenDrawer: () => void;
}

export default function MobileHeader({ onOpenDrawer }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--background-primary)] px-3 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          className="p-2 hover:bg-[var(--hover-bg)] rounded transition-colors duration-150"
          onClick={onOpenDrawer}
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]">
            <line x1="3" y1="12" x2="17" y2="12" />
            <line x1="3" y1="6" x2="17" y2="6" />
            <line x1="3" y1="18" x2="17" y2="18" />
          </svg>
        </button>
        <h2 className="text-[var(--text-primary)] font-semibold text-sm tracking-wide uppercase">Portfolio</h2>
      </div>
      <div className="flex items-center space-x-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
} 