'use client';

import { type Locale } from '@/i18n/i18n';
import { usePathname, useRouter } from '@/navigation';
import { saveLanguagePreference } from '@/utils/languageDetection';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
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
    <div className="navbar-language-switcher flex items-center gap-2">
      <Globe size={16} className="text-white/80" />
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        className="bg-transparent text-white/80 hover:text-racing-red border-none focus:ring-0 focus:outline-none text-sm font-medium transition-colors appearance-none cursor-pointer"
        disabled={isPending}
      >
        <option value="en" className="bg-racing-dark text-white">English</option>
        <option value="fr" className="bg-racing-dark text-white">Français</option>
        <option value="nl" className="bg-racing-dark text-white">Nederlands</option>
      </select>
      {isPending && (
        <span className="text-xs text-white/60 animate-pulse">...</span>
      )}
    </div>
  );
}
