'use client';

import {
  EventItem,
  countryFlags,
  formatEventDate,
  tracks,
  types,
} from '@/data/events';
import { Calendar, CircleX, Clock, MapPin, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  event: EventItem;
  locale: string;
  isPast?: boolean;
}

export default function EventCard({
  event,
  locale,
  isPast = false,
}: EventCardProps) {
  const t = useTranslations('events');

  // Calculate fill percentage if capacity is available
  // If registrations is 0 or undefined, show 0%
  const fillPercentage =
    event.capacity !== undefined
      ? Math.min(Math.round(((event.registrations || 0) / event.capacity) * 100), 100)
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
        {event.cancel && (
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        )}
        <div
          className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
            event.type === 'trackday' ? 'bg-racing-red' : 'bg-racing-black'
          } text-white z-20`}
        >
          {types[event.type as 'trackday' | 'simracing']}
        </div>

        {(event.soldOut || (fillPercentage && fillPercentage === 100)) &&
          !event.cancel && (
            <div className="absolute top-0 right-0 py-1 px-3 text-xs font-bold bg-racing-black text-white rotate-0 m-2 rounded z-20">
              <p>{t('event.soldOut')}</p>
            </div>
          )}

        {event.cancel && (
          <div className="absolute top-0 right-0 py-1 px-3 text-xs font-bold bg-racing-red text-white rotate-0 m-2 rounded z-20">
            <p className="uppercase">{t('event.canceled')}</p>
          </div>
        )}
      </div>

      <div className="p-4">
        {event.cancel && (
          <div className="mb-4 p-2 bg-racing-red bg-opacity-10 rounded-md">
            <p className="text-sm text-white font-semibold flex items-center">
              <CircleX className="h-4 w-4 mr-2" />
              {t('event.canceledNotice')}
            </p>
          </div>
        )}
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
