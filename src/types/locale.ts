export type Locale = 'en' | 'pt';

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
  availableLocales: Locale[];
}

export interface LocaleData {
  id: number;
  language_tag: Locale;
  name: string;
  active: boolean;
} 