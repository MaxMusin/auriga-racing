'use client';

import { usePathname, useRouter } from '@/navigation';
import {
  getUserLanguagePreference,
  type Locale,
} from '@/utils/languageDetection';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * This component initializes the language preference on the client side.
 * It checks if there's a saved language preference and applies it if needed.
 * This should be included in the root layout to ensure it runs on every page.
 */
export default function LanguageInitializer() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run this once on client-side initialization
    const savedLocale = getUserLanguagePreference();

    // If there's a saved preference and it's different from the current locale,
    // navigate to the same page but with the saved locale
    if (savedLocale && savedLocale !== currentLocale) {
      router.replace(pathname, { locale: savedLocale });
    }

    // We intentionally don't include dependencies here because we only want this to run once
    // on initial page load. Including the dependencies would cause this to run on every route change,
    // potentially creating an infinite loop if the router.replace triggers a re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this only runs once

  // This component doesn't render anything
  return null;
}
