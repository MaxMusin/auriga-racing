'use client';

import Header from '@/components/Header';
import {
  EventItem,
  events,
} from '@/data/events';
import { useLocale, useTranslations } from 'next-intl';
import EventCard from '@/components/EventCard';

export default function EventsPage() {
  const t = useTranslations('events');
  const locale = useLocale();

  // Sort all events by date (upcoming first)
  const currentDate = new Date(); // Use the actual current date
  const sortedEvents = [...events].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  // Separate upcoming and past events
  const upcomingEvents = sortedEvents.filter(
    (event) => event.date >= currentDate,
  );
  const pastEvents = sortedEvents.filter((event) => event.date < currentDate);

  return (
    <div className="pt-[144px] bg-card pb-16">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Header title={t('fullCalendar')} subtitle={t('subtitle')} centered />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{t('title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event: EventItem) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        </div>

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">{t('pastEvents')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event: EventItem) => (
                <EventCard key={event.id} event={event} locale={locale} isPast={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
