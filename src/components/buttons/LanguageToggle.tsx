'use client';

import { useLocale } from '@/hooks/useLocale';
import { Locale } from '@/types/locale';
import { useState, useRef, useEffect } from 'react';

export default function LanguageToggle() {
  const { locale, setLocale, availableLocales } = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleSelect = (loc: string) => {
    if (loc !== locale) {
      setLocale(loc as Locale);
    }
    setOpen(false);
  };

  return (
    <div className="relative h-8 flex items-center min-w-[72px]" ref={dropdownRef}>
      <button
        type="button"
        className="h-8 w-[88px] min-w-[72px] px-4 pr-8 text-xs font-mono rounded-md border border-[var(--border)] bg-[var(--background-secondary)] text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--accent-blue)]  transition-all theme-transition cursor-pointer flex items-center justify-between gap-2 shadow-sm outline-none"
        onClick={() => setOpen((v) => !v)}
        title="Select language"
      >
        <span className="truncate">{locale.toUpperCase()}</span>
        <span className="absolute right-3 text-[var(--text-secondary)] text-xs pointer-events-none select-none">▼</span>
      </button>
      {open && (
        <ul
          className="absolute left-0 top-full z-20 w-[88px] min-w-[72px] bg-[var(--background-secondary)] border border-[var(--border)] rounded-md shadow-lg mt-1 flex flex-col theme-transition animate-fade-in"
        >
          {availableLocales.map((loc, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === availableLocales.length - 1;
            return (
              <li
                key={loc}
                onClick={() => handleSelect(loc)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleSelect(loc); }}
                className={`w-full h-8 px-4 text-xs font-mono cursor-pointer transition-colors select-none flex items-center outline-none focus:bg-[var(--accent-blue)] focus:text-white ${isFirst ? 'rounded-t-md' : ''} ${isLast ? 'rounded-b-md' : ''} ${loc === locale ? 'bg-[var(--accent-blue)] text-white font-bold' : 'hover:bg-blue-500/20 text-[var(--text-primary)]'}`}
                {...(loc === locale ? { 'aria-selected': true } : {})}
              >
                <span className="truncate">{loc.toUpperCase()}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
} 