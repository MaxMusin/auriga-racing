'use client';

import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter } from '@/utils/brevo';
import { Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast({
        variant: 'destructive',
        title: t('newsletter.invalidEmail'),
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Appel direct à la fonction serveur
      const result = await subscribeToNewsletter(email);

      toast({
        variant: result.success ? 'default' : 'destructive',
        title: result.message,
        duration: 3000,
      });

      if (result.success) {
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: 'destructive',
        title: t('newsletter.error'),
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background text-white pt-16 pb-8">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-2 md:mb-6">
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
            <p className="text-muted-foreground mb-2 md:mb-6">
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

          <div></div>

          <div>
            <h3 className="text-lg font-bold mb-2 md:mb-6">
              {t('quickLinks.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.trackdays')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#teams"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.teams')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#gallery"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  href="/#join"
                  className="text-muted-foreground hover:text-racing-red transition-colors"
                >
                  {t('quickLinks.joinUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-bold mb-2 md:mb-6">{t('resources.title')}</h3>
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
          </div> */}

          <div>
            <h3 className="text-lg font-bold mb-2 md:mb-6">
              {t('newsletter.title')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('newsletter.description')}
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <div>
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t('newsletter.submitting')
                  : t('newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex space-x-6">
              {/* <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.privacy')}
              </a> */}
              {/* <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.terms')}
              </a> */}
              <Link
                href="/terms-of-sale"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.termsOfSale')}
              </Link>
              {/* <a
                href="#"
                className="text-sm text-muted-foreground hover:text-racing-red transition-colors"
              >
                {t('legalLinks.cookies')}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
