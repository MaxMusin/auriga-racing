import Footer from '@/components/Footer';
import LanguageInitializer from '@/components/LanguageInitializer';
import Navbar from '@/components/Navbar';
import { getMessages, Locale } from '@/i18n/i18n';
import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import '../globals.css';
import { IntlProvider } from './providers';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;

  // This is needed for the dynamic route parameter to work in Next.js 15
  unstable_setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'app' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout(props: Props) {
  const { locale } = await props.params;

  // This is needed for the dynamic route parameter to work in Next.js 15
  unstable_setRequestLocale(locale);

  // Load messages for the current locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <IntlProvider locale={locale} messages={messages}>
          {/* This component checks for user language preferences and applies them */}
          <LanguageInitializer />
          <Navbar />
          <div className="min-h-screen overflow-x-hidden">
            {props.children}
          </div>
          <Footer />
        </IntlProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
