'use client';

import { Car, Gamepad } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const TeamsSection = () => {
  const t = useTranslations('teams');
  
  return (
    <section id="teams" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <div className="h-1 w-24 racing-gradient mx-auto mb-8"></div>
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
                  <span className="text-racing-red mr-2">✓</span>
                  <span>{t('track.features.drivers')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">✓</span>
                  <span>{t('track.features.equipment')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-red mr-2">✓</span>
                  <span>{t('track.features.training')}</span>
                </li>
              </ul>
              <a href="#join" className="btn-primary w-full">
                {t('track.cta')}
              </a>
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
                <Gamepad className="h-6 w-6 text-racing-blue" />
                <h3 className="text-2xl font-bold">{t('simracing.title')}</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                {t('simracing.description')}
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>{t('simracing.features.leagues')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>{t('simracing.features.equipment')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-racing-blue mr-2">✓</span>
                  <span>{t('simracing.features.coaching')}</span>
                </li>
              </ul>
              <a href="#join" className="btn-secondary w-full">
                {t('simracing.cta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
