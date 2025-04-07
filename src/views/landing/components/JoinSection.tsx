'use client';

import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

const JoinSection = () => {
  const t = useTranslations('join');
  
  return (
    <section id="join" className="section-padding bg-racing-red">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('title')}
            </h2>
            <div className="h-1 w-24 bg-racing-red mb-8"></div>

            <p className="text-lg text-white/80 mb-8">
              {t('description')}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('whyJoinUs')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.coaching')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.equipment')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.events')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.community')}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">{t('contact.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-white mr-3 h-5 w-5" />
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {t('contact.email')}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="text-white mr-3 h-5 w-5" />
                  <a
                    href={`tel:${t('contact.phone')}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {t('contact.phone')}
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">
                    {t('contact.organization')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {t('form.title')}
            </h3>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    {t('form.firstName')}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    {t('form.lastName')}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                />
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  {t('form.interest.label')}
                </label>
                <select
                  id="interest"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  required
                >
                  <option value="">{t('form.interest.placeholder')}</option>
                  <option value="trackday">{t('form.interest.trackday')}</option>
                  <option value="simracing">{t('form.interest.simracing')}</option>
                  <option value="both">{t('form.interest.both')}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  {t('form.experience.label')}
                </label>
                <select
                  id="experience"
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                >
                  <option value="">{t('form.experience.placeholder')}</option>
                  <option value="none">{t('form.experience.none')}</option>
                  <option value="beginner">{t('form.experience.beginner')}</option>
                  <option value="intermediate">{t('form.experience.intermediate')}</option>
                  <option value="experienced">{t('form.experience.experienced')}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  {t('form.message.label')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-racing-red"
                  placeholder={t('form.message.placeholder')}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                {t('form.submit')}
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {t('form.disclaimer')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
