import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (context) => {
  // Use requestLocale instead of context.locale
  // requestLocale is a Promise, not a function
  const locale = await context.requestLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Europe/Paris',
    now: new Date('2025-04-04T12:00:00Z'), // Use a fixed date to prevent hydration errors
  };
});
