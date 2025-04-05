import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
 
  // Used when no locale matches
  defaultLocale,
  
  // Locale detection strategy
  localeDetection: true,
  
  // Don't redirect from / to /en
  localePrefix: 'as-needed'
});
 
export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - api routes
  // - _next
  // - public files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
