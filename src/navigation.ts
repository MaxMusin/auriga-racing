import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from './i18n/i18n';

// Create the navigation utilities
export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: {
      '/': '/',
      '/about': {
        en: '/about',
        fr: '/a-propos',
        nl: '/over-ons',
      },
      '/contact': '/contact',
    },
  });
