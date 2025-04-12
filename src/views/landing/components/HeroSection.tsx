'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { scrollToAnchor } from '@/utils';

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('hero');

  useEffect(() => {
    // Add parallax effect on scroll
    const handleScroll = () => {
      setOffset(window.scrollY * 0.2); // Adjust the multiplier for parallax intensity
    };

    // Trigger fade-in animation after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToContent = () => {
    // Target the first section after hero (UpcomingEventsSection)
    scrollToAnchor('events');
  };

  const handleScrollToJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor('join');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: "url('/images/auriga-racing-car.jpg')",
            backgroundPosition: 'center',
            transform: `translateY(${offset}px)`,
          }}
        ></div>
      </div>

      {/* Racing stripe - right side with PITLANE text */}
      <div className="absolute bottom-4 md:bottom-0 md:top-0 md:right-0 w-full md:h-full w-16 md:w-24 bg-racing-red opacity-50 z-10 flex items-center justify-center">
        <div className="md:-rotate-90 transform origin-center whitespace-nowrap">
          <span className="text-white font-bold text-6xl tracking-[0.15em] uppercase">
            {t('pitlane')}
          </span>
        </div>
      </div>

      {/* Content with fade-in animations */}
      <div
        className={`container mx-auto px-4 z-20 text-center transition-all duration-1000 ease-out relative flex flex-col items-center justify-center md:mb-[100px] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="relative w-full h-20 md:h-40 mb-4 md:mb-12">
          <Image
            src="/images/auriga_racing__logo.svg"
            alt="Auriga Racing Logo"
            fill
            priority
            className={`object-contain transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          />
        </div>
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 md:mb-6 transition-all duration-1000 delay-400 uppercase ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t('title')} <br />
          <span className="bg-racing-black">{t('subtitle')}</span>
        </h1>
        <p
          className={`max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-4 md:mb-8 mx-auto transition-all duration-1000 delay-400 font-medium ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t('description')}
        </p>
        <div
          className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button onClick={scrollToContent} className="btn-primary text-base">
            {t('cta')}
          </button>
          <button onClick={handleScrollToJoin} className="btn-secondary text-base">
            {t('simracingTeam')}
          </button>
        </div>
      </div>

      {/* Scroll indicator - positioned at the bottom of the section */}
      <div
        className={`absolute md:bottom-8 bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer transition-opacity duration-1000 delay-800 z-30 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToContent}
      >
        <div className="animate-bounce">
          <ChevronDown className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Checkered flag pattern - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 checkered-border z-20"></div>
    </section>
  );
};

export default HeroSection;
