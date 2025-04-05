import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, type Locale } from './i18n/i18n';
import { detectLanguage } from './utils/languageDetection';
import { NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
 
  // Used when no locale matches
  defaultLocale,
  
  // Custom locale detection strategy
  localeDetection: {
    // This function is called when no locale is found in the pathname
    // It allows us to detect the user's preferred language from the Accept-Language header
    getLocale: (request: NextRequest) => {
      // Check for a cookie first (for user's manual selection)
      const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
      if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        return cookieLocale;
      }
      
      // Otherwise detect from Accept-Language header
      const acceptLanguage = request.headers.get('Accept-Language');
      return detectLanguage(acceptLanguage);
    }
  } as any, // Type assertion needed due to next-intl typing limitations
  
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
