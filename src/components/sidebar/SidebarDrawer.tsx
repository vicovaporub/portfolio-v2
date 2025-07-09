import { ReactNode } from 'react';
import ThemeToggle from '../buttons/ThemeToggle';
import LanguageToggle from '../buttons/LanguageToggle';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  userName?: string;
}

export default function SidebarDrawer({ isOpen, onClose, children, userName }: SidebarDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-label="Fechar menu"
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 max-w-full bg-[var(--sidebar-bg)] border-r border-[var(--border)] z-50 flex flex-col font-mono theme-transition transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:w-60 md:h-screen md:z-0`}
      >
        <div className="hidden md:flex items-center justify-between px-3 py-2.5 border-b border-[var(--border)] bg-[var(--sidebar-header-bg)]">
          <div className="flex items-center space-x-2">
            <h2 className="text-[var(--text-primary)] font-semibold text-[11px] tracking-wide uppercase">Portfolio</h2>
          </div>
          <div className="flex items-center space-x-1">
            <LanguageToggle />
            <ThemeToggle />
            
          </div>
        </div>
        {/* Mobile close button */}
        <button
          className="md:hidden absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto sidebar-scrollbar">
          <div className="py-1 md:pt-0 pt-16">
            {children}
          </div>
        </div>
        <div className="border-t border-[var(--border)] p-2 bg-[var(--sidebar-header-bg)]">
          <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono">
            <span>{userName}</span>
            <span>2025</span>
          </div>
        </div>
      </aside>
    </>
  );
} 