// Can be imported from a shared config
export const locales = ['en', 'fr', 'nl'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Use this function in server components
export async function getMessages(locale: Locale) {
  try {
    return (await import(`./messages/${locale}/index.json`)).default;
  } catch {
    return (await import(`./messages/en/index.json`)).default;
  }
}

// This is used by the middleware to verify that
// the requested locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Create an object with all named exports
const i18n = {
  locales,
  defaultLocale,
  getMessages,
  isValidLocale
};

// Default export
export default i18n;
