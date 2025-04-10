'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { 
  EventItem, 
  countryFlags, 
  formatEventDate, 
  tracks, 
  types 
} from '@/data/events';

interface EventCardProps {
  event: EventItem;
  locale: string;
  isPast?: boolean;
}

export default function EventCard({ event, locale, isPast = false }: EventCardProps) {
  const t = useTranslations('events');
  
  return (
    <Link
      href={`/events/${event.id}`}
      className={`block bg-background rounded-lg overflow-hidden shadow-md card-hover ${
        isPast ? 'opacity-80 hover:opacity-100 transition-opacity' : ''
      }`}
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          fill
          src={`/images/${event.track}.jpg`}
          alt={tracks[event.track]}
          className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`}
        />
        <div
          className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
            event.type === 'trackday' ? 'bg-racing-red' : 'bg-racing-black'
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
  );
}
