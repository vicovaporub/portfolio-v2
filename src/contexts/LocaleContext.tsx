'use client';

import { createContext, useEffect, useState, ReactNode } from "react";
import { Locale, LocaleContextType } from "@/types/locale";

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
    children: ReactNode;
    initialLocales: Locale[];
}

export function LocaleProvider({ children, initialLocales }: LocaleProviderProps) {
    const [locale, setLocaleState] = useState<Locale>('en');
    const [availableLocales] = useState<Locale[]>(initialLocales);
    const [isLoading, setIsLoading] = useState(true);

    const detectBrowserLocale = (available: Locale[]): Locale => {
        if (typeof window === 'undefined') return available[0] || 'en';
    
        const browserLocale = navigator.language.toLowerCase();
    
        for (const availableLocale of available) {
            if (browserLocale.startsWith(availableLocale)) {
                return availableLocale;
            }
        }
    
        return available[0] || 'en';
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
        const initializeLocales = () => {
            try {
                const savedLocale = localStorage.getItem('locale') as Locale;
                const detectedLocale = detectBrowserLocale(availableLocales);
        
                const initialLocale = (savedLocale && availableLocales.includes(savedLocale)) 
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
    }, [availableLocales]);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    return (
        <LocaleContext.Provider value={{ locale, setLocale, isLoading, availableLocales }}>
            {children}
        </LocaleContext.Provider>
    );
}





