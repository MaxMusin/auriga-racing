'use client';

import Header from '@/components/Header';
import { Calendar, Clock, Flag, MapPin } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { events, tracks, types, countryFlags, EventItem, formatEventDate } from '@/data/events';

const UpcomingEventsSection = () => {
  const t = useTranslations('events');
  const locale = useLocale();

  return (
    <section id="events" className="section-padding bg-card clip-diagonal">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Header title={t('title')} subtitle={t('subtitle')} centered />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event: EventItem) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="block bg-background rounded-lg overflow-hidden shadow-md card-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  fill
                  src={`/images/${event.track}.jpg`}
                  alt={tracks[event.track]}
                  className="w-full h-full object-cover"
                  priority
                />
                <div
                  className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
                    event.type === 'trackday'
                      ? 'bg-racing-red'
                      : 'bg-racing-black'
                  } text-white`}
                >
                  {types[event.type as 'trackday' | 'simracing']}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-1">
                  {t('track', { track: tracks[event.track] })}{' '}
                  {countryFlags[event.country as EventItem['country']]}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatEventDate(event.date, locale)}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="line-clamp-1">{`${t('track', { track: tracks[event.track] })}, ${t('countries.' + event.country)}`}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#" className="btn-primary inline-flex items-center">
            <Flag className="mr-2 h-5 w-5" />
            {t('fullCalendar')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
