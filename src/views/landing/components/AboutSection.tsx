import AnimatedCounter from '@/components/AnimatedCounter';
import Header from '@/components/Header';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const About = () => {
  const t = useTranslations('about');

  const stats = [
    {
      value: 20,
      label: t('stats.trackdays.label'),
      suffix: '+',
    },
    {
      value: 9,
      label: t('stats.experience.label'),
      suffix: '',
    },
    {
      value: 80,
      label: t('stats.enthusiasts.label'),
      suffix: '+',
    },
    {
      value: 500,
      label: t('stats.laps.label'),
      suffix: '+',
    },
  ];

  return (
    <section
      id="about"
      className="race-section bg-background clip-diagonal relative section-padding"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <Header title={t('title')} subtitle={t('subtitle')} />
            <p className="text-white/80 text-lg">{t('paragraph1')}</p>
            <p className="text-white/80 text-lg">{t('paragraph2')}</p>
            <a
              href="#trackdays"
              className="inline-flex items-center gap-2 text-racing-red hover:text-red-400 font-semibold transition-colors"
            >
              {t('cta')} <ArrowRight size={16} />
            </a>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-0 pb-[66%]">
              <Image
                fill
                src="/images/auriga-racing-car.jpg"
                alt={t('imageAlt')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-racing-red mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  delay={index * 200}
                />
              </div>
              <p className="text-white/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
