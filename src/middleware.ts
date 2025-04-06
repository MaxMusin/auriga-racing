import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/i18n';

// Create the middleware with a simpler configuration
export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Don't redirect from / to /en
  localePrefix: 'as-needed',
});

// Configure the middleware matcher
export const config = {
  // Match all pathnames except for
  // - files with extensions (e.g. favicon.ico)
  // - api routes
  // - _next
  // - public files
  matcher: ['/((?!api|_next|.*\\..*|_vercel).*)'],
};
