import { Locale } from '@/types/locale';

export function parseLocalizedText(text: string, languageTag: Locale): string {

  if (!text.includes('^^')) {
    return text;
  }

  const parts = text.split('^^');
  const mainText = parts[0]; 

  for (let i = 1; i < parts.length; i++) {
    const [lang, ...content] = parts[i].split(':');
    if (lang === languageTag) {
      return content.join(':');
    }
  }

  return mainText; 
}

export function getLocalizedText(text: string, languageTag: Locale): string {
  return parseLocalizedText(text, languageTag);
}

export function validateLocalizedTextFormat(text: string): boolean {
  if (!text.includes('^^')) {
    return true;
  }

  const parts = text.split('^^');
  if (parts.length < 2) {
    return false;
  }

  for (let i = 1; i < parts.length; i++) {
    if (!parts[i].includes(':')) {
      return false;
    }
  }

  return true;
}


