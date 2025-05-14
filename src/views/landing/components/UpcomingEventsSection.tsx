'use client';

import Header from '@/components/Header';
import {
  EventItem,
  events,
} from '@/data/events';
import { Calendar } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import EventCard from '@/components/EventCard';

const UpcomingEventsSection = () => {
  const t = useTranslations('events');
  const locale = useLocale();

  // Filter upcoming events (after current date), exclude canceled events, and take only the next 4
  const currentDate = new Date(); // Use the actual current date
  const upcomingEvents = events
    .filter((event) => event.date > currentDate && !event.cancel)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);

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
          {upcomingEvents.map((event: EventItem) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/events" className="btn-primary inline-flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {t('fullCalendar')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
