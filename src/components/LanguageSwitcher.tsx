'use client';

import { type Locale } from '@/i18n/i18n';
import { usePathname, useRouter } from '@/navigation';
import { saveLanguagePreference } from '@/utils/languageDetection';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('app');
  const currentLocale = useLocale();
  const locale = currentLocale as Locale; // Cast to our Locale type
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locale;

    // Save the user's language preference
    saveLanguagePreference(newLocale);

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        {t('language')}:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-sm"
        disabled={isPending}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="nl">Nederlands</option>
      </select>
      {isPending && (
        <span className="text-xs text-gray-500 animate-pulse">Loading...</span>
      )}
    </div>
  );
}
