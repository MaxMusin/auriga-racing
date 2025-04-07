'use client';

import Header from '@/components/Header';
import { Calendar, Clock, Flag, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface EventItem {
  id: number;
  event: string;
  date: string;
  time: string;
  location: string;
  type: 'track' | 'sim';
}

const UpcomingEventsSection = () => {
  const t = useTranslations('events');
  
  const upcomingEvents = t.raw('items') as EventItem[];

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
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-background rounded-lg overflow-hidden shadow-md card-hover"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  fill
                  src={'/images/auriga-racing-car.jpg'}
                  alt={event.event}
                  className="w-full h-full object-cover"
                  priority
                />
                <div
                  className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
                    event.type === 'track' ? 'bg-racing-red' : 'bg-racing-blue'
                  } text-white`}
                >
                  {event.type === 'track' ? t('types.track') : t('types.sim')}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 line-clamp-1">
                  {event.event}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
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
