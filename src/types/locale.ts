export type Locale = 'en' | 'pt';

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
} 