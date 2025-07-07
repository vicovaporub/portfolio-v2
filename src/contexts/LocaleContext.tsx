'use client';

import { createContext, useEffect, useState, ReactNode } from "react";
import { Locale, LocaleContextType } from "@/types/locale";

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isLoading, setIsLoading] = useState(true);

  const detectBrowserLocale = (): Locale => {
    if (typeof window === 'undefined') return 'en';
    
    const browserLocale = navigator.language.toLowerCase();
    if (browserLocale.startsWith('pt')) {
      return 'pt';
    }
    return 'en';
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    const detectedLocale = detectBrowserLocale();
    const initialLocale = savedLocale || detectedLocale;
    
    setLocaleState(initialLocale);
    setIsLoading(false);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LocaleContext.Provider>
  );
}





