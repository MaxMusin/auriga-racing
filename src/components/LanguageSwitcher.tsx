'use client';

import { type Locale } from '@/i18n/i18n';
import { usePathname, useRouter } from '@/navigation';
import { saveLanguagePreference } from '@/utils/languageDetection';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Check, ChevronDown, Globe, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils';

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const locale = currentLocale as Locale; // Cast to our Locale type
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    // Save the user's language preference
    saveLanguagePreference(newLocale);

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="navbar-language-switcher flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex items-center gap-1.5 bg-transparent text-white/80 hover:text-white border-none focus:ring-0 focus:outline-none text-md lg:text-sm font-medium transition-colors cursor-pointer relative group">
          {isPending ? <Loader2 size={14} className="text-white/80 animate-spin" /> : <Globe size={14} className="text-white/80" />}
          <span className="capitalize">{locale === 'en' ? 'English' : locale === 'fr' ? 'Français' : 'Nederlands'}</span>
          <ChevronDown size={14} className={cn("transition-transform", isPending && "animate-pulse")} />
          <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-racing-red transition-all duration-300 group-hover:w-full"></span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-racing-black border-racing-black/50 mt-2 ml-4 lg:ml-0">
          <DropdownMenuItem 
            className={cn(
              "flex justify-between text-md lg:text-sm text-white/80 hover:text-white hover:bg-racing-red focus:bg-racing-red focus:text-white cursor-pointer"
            )}
            onClick={() => handleLocaleChange('en')}
          >
            English
            {locale === 'en' && <Check size={16} />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={cn(
              "flex justify-between text-md lg:text-sm text-white/80 hover:text-white hover:bg-racing-red focus:bg-racing-red focus:text-white cursor-pointer"
            )}
            onClick={() => handleLocaleChange('fr')}
          >
            Français
            {locale === 'fr' && <Check size={16} />}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={cn(
              "flex justify-between text-md lg:text-sm text-white/80 hover:text-white hover:bg-racing-red focus:bg-racing-red focus:text-white cursor-pointer"
            )}
            onClick={() => handleLocaleChange('nl')}
          >
            Nederlands
            {locale === 'nl' && <Check size={16} />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
