'use client';

import { Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-white pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative h-10 w-40">
                <Image
                  src="/images/auriga_racing__logo.svg"
                  alt={t('logoAlt')}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              {t('tagline')}
              <br />
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/auriga.racing.team"
                className="text-muted-foreground hover:text-racing-red transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/aurigaracing/"
                className="text-muted-foreground hover:text-racing-red transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">{t('quickLinks.title')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.home')}
                </a>
              </li>
              <li>
                <a
                  href="#teams"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.teams')}
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.results')}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.gallery')}
                </a>
              </li>
              <li>
                <a
                  href="#join"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.joinUs')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">{t('resources.title')}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('resources.calendar')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('resources.training')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('resources.sponsors')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('resources.equipment')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('resources.blog')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">{t('newsletter.title')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('newsletter.description')}
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                required
              />
              <button type="submit" className="btn-primary w-full">
                {t('newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t('copyright', { year: currentYear })}
            </p>
            {/* <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.privacy')}
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.terms')}
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.cookies')}
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
