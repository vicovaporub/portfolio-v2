'use client';

import { useContext } from "react";
import { LocaleContext } from "@/contexts/LocaleContext";
import { LocaleContextType } from "@/types/locale";

export function useLocale(): LocaleContextType {
    const context = useContext(LocaleContext);
    
    if (context === undefined) {
        console.error('useLocale must be used within a LocaleProvider. Returning default locale (en).');
        return {
            locale: 'en',
            setLocale: () => {},
            isLoading: false,
            availableLocales: ['en']
        };
    }
    
    return context;
} 