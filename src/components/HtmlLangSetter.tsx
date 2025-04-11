'use client';

import { useEffect } from 'react';
import { Locale } from '@/i18n/i18n';

type HtmlLangSetterProps = {
  locale: Locale;
};

/**
 * Client component that updates the HTML lang attribute
 * This is needed because the root layout is server-rendered and doesn't
 * have access to the dynamic locale from the URL
 */
export default function HtmlLangSetter({ locale }: HtmlLangSetterProps) {
  useEffect(() => {
    // Update the HTML lang attribute when the locale changes
    document.documentElement.lang = locale;
  }, [locale]);

  // This component doesn't render anything
  return null;
}
