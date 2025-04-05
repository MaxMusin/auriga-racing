import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (context) => {
  const locale = context.locale;
  
  return {
    locale,
    messages: (await import(`./messages/${locale}/index.json`)).default,
    timeZone: 'Europe/Paris',
    now: new Date('2025-04-04T12:00:00Z'), // Use a fixed date to prevent hydration errors
  };
});
