'use client';

import { Calendar, Clock, MapPin, Users } from 'lucide-react';
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
  
  // Calculate fill percentage if capacity and registrations are available
  const fillPercentage = event.capacity && event.registrations 
    ? Math.min(Math.round((event.registrations / event.capacity) * 100), 100)
    : null;
  
  // Determine color based on fill percentage
  const getFillColor = () => {
    if (!fillPercentage) return 'bg-racing-dark';
    if (fillPercentage >= 90) return 'bg-racing-darkred';
    if (fillPercentage >= 70) return 'bg-racing-red';
    return 'bg-racing-lightred';
  };
  
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

        {(event.soldOut || (fillPercentage && fillPercentage === 100)) && (
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

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="line-clamp-1">{`${t('track', {
            track: tracks[event.track],
          })}, ${t('countries.' + event.country)}`}</span>
        </div>
        
        {/* Fill percentage indicator */}
        {fillPercentage !== null && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <p>{t('event.booked')}</p>
              </div>
              <span className="font-medium">{fillPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full ${getFillColor()} rounded-full`} 
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
