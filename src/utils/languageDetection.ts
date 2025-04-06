import { defaultLocale, locales, type Locale } from '@/i18n/i18n';

// Re-export the Locale type for convenience
export type { Locale };

/**
 * Detects the preferred language from the Accept-Language header
 * Falls back to the default locale if no match is found
 */
export function detectLanguage(acceptLanguageHeader?: string | null): Locale {
  if (!acceptLanguageHeader) return defaultLocale;

  // Parse the Accept-Language header
  // Format is typically: "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"
  const languages = acceptLanguageHeader
    .split(',')
    .map((lang) => {
      const [language, quality = 'q=1.0'] = lang.trim().split(';');
      const qValue = parseFloat(quality.split('=')[1]) || 1.0;
      // Extract just the language code (e.g., 'en' from 'en-US')
      const langCode = language.split('-')[0].toLowerCase();
      return { langCode, qValue };
    })
    .sort((a, b) => b.qValue - a.qValue); // Sort by quality value, highest first

  // Find the first language that matches our supported locales
  for (const { langCode } of languages) {
    if (locales.includes(langCode as Locale)) {
      return langCode as Locale;
    }
  }

  return defaultLocale;
}

/**
 * Saves the user's language preference to localStorage
 */
export function saveLanguagePreference(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userLanguage', locale);
  }
}

/**
 * Gets the user's language preference from localStorage
 * Returns null if no preference is found
 */
export function getUserLanguagePreference(): Locale | null {
  if (typeof window === 'undefined') return null;

  const savedLanguage = localStorage.getItem('userLanguage');
  if (savedLanguage && locales.includes(savedLanguage as Locale)) {
    return savedLanguage as Locale;
  }

  return null;
}

/**
 * Gets the preferred language in this order:
 * 1. User's saved preference (if available)
 * 2. Browser/system language (if available and supported)
 * 3. Default locale as fallback
 */
export function getPreferredLanguage(
  acceptLanguageHeader?: string | null,
): Locale {
  // Check for user preference first (client-side only)
  const userPreference = getUserLanguagePreference();
  if (userPreference) return userPreference;

  // Otherwise detect from browser/system
  return detectLanguage(acceptLanguageHeader);
}
