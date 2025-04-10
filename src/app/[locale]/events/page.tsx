'use client';

import Header from '@/components/Header';
import {
  countryFlags,
  EventItem,
  events,
  formatEventDate,
  tracks,
  types,
} from '@/data/events';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale();

  // Sort all events by date (upcoming first)
  const currentDate = new Date(2025, 3, 10); // April 10, 2025
  const sortedEvents = [...events].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  // Separate upcoming and past events
  const upcomingEvents = sortedEvents.filter(
    (event) => event.date >= currentDate,
  );
  const pastEvents = sortedEvents.filter((event) => event.date < currentDate);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Header title={t('fullCalendar')} subtitle={t('subtitle')} centered />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event: EventItem) => (
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

                  {event.soldOut && (
                    <div className="absolute top-0 right-0 py-1 px-3 text-xs font-bold bg-racing-black text-white rotate-0 m-2 rounded">
                      {t('event.soldOut')}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">
                    {t('event.title', { track: tracks[event.track] })}{' '}
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
                    <span className="line-clamp-1">{`${t('track', {
                      track: tracks[event.track],
                    })}, ${t('countries.' + event.country)}`}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event: EventItem) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="block bg-background rounded-lg overflow-hidden shadow-md card-hover opacity-80 hover:opacity-100 transition-opacity"
                >
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      fill
                      src={`/images/${event.track}.jpg`}
                      alt={tracks[event.track]}
                      className="w-full h-full object-cover grayscale"
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
                    {event.soldOut && (
                      <div className="absolute top-0 right-0 py-1 px-3 text-xs font-bold bg-racing-black text-white rotate-0 m-2 rounded">
                        {t('event.soldOut')}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      {t('event.title', { track: tracks[event.track] })}{' '}
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
                      <span className="line-clamp-1">{`${t('track', {
                        track: tracks[event.track],
                      })}, ${t('countries.' + event.country)}`}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
