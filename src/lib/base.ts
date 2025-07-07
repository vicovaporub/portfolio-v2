import { Locale } from '@/types/locale';

/**
 * Parse localized text in format: 'English text ^^pt:Texto em português'
 * @param text - Text with localization markers
 * @param languageTag - Target language (e.g., 'en', 'pt')
 * @returns Localized text or fallback to English
 */
export function parseLocalizedText(text: string, languageTag: Locale): string {
  // If no separator, return original text
  if (!text.includes('^^')) {
    return text;
  }

  const parts = text.split('^^');
  const mainText = parts[0]; // English text (default)

  // Look for the target language
  for (let i = 1; i < parts.length; i++) {
    const [lang, ...content] = parts[i].split(':');
    if (lang === languageTag) {
      return content.join(':'); // Join in case content has ':'
    }
  }

  return mainText; // Fallback to English
}

/**
 * Get localized text from a string that contains multiple languages
 * @param text - Text with localization markers (e.g., 'English text ^^pt:Texto em português')
 * @param languageTag - Target language
 * @returns Localized text or fallback to English
 */
export function getLocalizedText(text: string, languageTag: Locale): string {
  return parseLocalizedText(text, languageTag);
}

/**
 * Validate if text has proper localization format
 * @param text - Text to validate
 * @returns True if format is valid
 */
export function validateLocalizedTextFormat(text: string): boolean {
  if (!text.includes('^^')) {
    return true; // Single language text is valid
  }

  const parts = text.split('^^');
  if (parts.length < 2) {
    return false;
  }

  // Check if each localized part has language:content format
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i].includes(':')) {
      return false;
    }
  }

  return true;
}
