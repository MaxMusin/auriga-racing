'use client';

import Header from '@/components/Header';
import { Car, Gamepad } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { scrollToAnchor } from '@/utils';

const TeamsSection = () => {
  const t = useTranslations('teams');

  const handleScrollToJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor('join');
  };

  return (
    <section id="teams" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Header title={t('title')} subtitle={t('subtitle')} centered />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Track Team */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg card-hover">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/auriga-racing__trackday.jpg"
                alt="Fun Cup Team"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6 text-racing-red" />
                <h3 className="text-2xl font-bold">{t('track.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {t('track.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('track.features.drivers')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('track.features.equipment')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('track.features.training')}
                  </span>
                </li>
              </ul>
              <button onClick={handleScrollToJoin} className="btn-primary w-full">
                {t('track.cta')}
              </button>
            </div>
          </div>

          {/* SimRacing Team */}
          <div className="bg-card rounded-lg overflow-hidden shadow-lg card-hover">
            <div className="h-64 overflow-hidden relative">
              <Image
                src="/images/auriga-racing__simracing.png"
                alt="SimRacing Team"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Gamepad className="h-6 w-6 text-racing-red" />
                <h3 className="text-2xl font-bold">{t('simracing.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {t('simracing.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('simracing.features.leagues')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('simracing.features.equipment')}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">✓</span>
                  <span className="text-white/80">
                    {t('simracing.features.coaching')}
                  </span>
                </li>
              </ul>
              <button onClick={handleScrollToJoin} className="btn-secondary w-full">
                {t('simracing.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
