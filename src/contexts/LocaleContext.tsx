'use client';

import { createContext, useEffect, useState, ReactNode } from "react";
import { Locale, LocaleContextType, LocaleData } from "@/types/locale";

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [availableLocales, setAvailableLocales] = useState<Locale[]>(['en']);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAvailableLocales = async (): Promise<Locale[]> => {
        try {
            const response = await fetch('/api/get-active-locales');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to fetch locales');
            }
            const localesData = await response.json();
            const locales = localesData.activeLocales
                .map((locale: LocaleData) => locale.language_tag);
            return locales;
        } catch (error) {
            console.error('Error fetching locales:', error);
            // Retorna fallback em caso de erro
            return ['en'];
        }
    };

    const detectBrowserLocale = (availableLocales: Locale[]): Locale => {
        if (typeof window === 'undefined') return availableLocales[0] || 'en';
    
        const browserLocale = navigator.language.toLowerCase();
    
        for (const availableLocale of availableLocales) {
            if (browserLocale.startsWith(availableLocale)) {
                return availableLocale;
            }
        }
    
        return availableLocales[0] || 'en';
    };

    const setLocale = (newLocale: Locale) => {

        if (availableLocales.includes(newLocale)) {
            setLocaleState(newLocale);
      
            if (typeof window !== 'undefined') {
                localStorage.setItem('locale', newLocale);
            }
        } else {
            console.warn(`Locale ${newLocale} is not available`);
        }
    };

    useEffect(() => {
        const initializeLocales = async () => {
            try {
                const locales = await fetchAvailableLocales();
                setAvailableLocales(locales);

                const savedLocale = localStorage.getItem('locale') as Locale;
                const detectedLocale = detectBrowserLocale(locales);
        
                const initialLocale = (savedLocale && locales.includes(savedLocale)) 
                    ? savedLocale 
                    : detectedLocale;
        
                setLocaleState(initialLocale);
            } catch (error) {
                console.error('Error initializing locales:', error);
                setLocaleState('en');
            } finally {
                setIsLoading(false);
            }
        };

        initializeLocales();
    }, []);

    useEffect(() => {
        document.documentElement.lang =  locale;
    }, [locale]);


    return (
        <LocaleContext.Provider value={{ locale, setLocale, isLoading, availableLocales }}>
            {children}
        </LocaleContext.Provider>
    );
}





