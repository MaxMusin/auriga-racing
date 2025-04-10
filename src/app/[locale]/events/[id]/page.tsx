import BackButton from '@/components/BackButton';
import EventCard from '@/components/EventCard';
import RegisterButton from '@/components/RegisterButton';
import { Calendar, Car, Clock, Flag, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Import the event data
import {
  countryFlags,
  events,
  formatEventDate,
  tracks,
  types,
} from '@/data/events';
import BookingSection from '@/views/events/components/BookingSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id: eventId, locale } = await params;
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  const t = await getTranslations('events');
  const trackName = tracks[event.track];

  return {
    title: t('event.title', { track: trackName }),
    description: `${t('event.description', { track: trackName, date: formatEventDate(event.date, locale) })}`,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id: eventId, locale } = await params;
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    notFound();
  }

  const t = await getTranslations('events');
  const trackName = tracks[event.track];
  const countryName = t(`countries.${event.country}`);

  return (
    <div className="bg-card">
      <div className="bg-background clip-diagonal">
        <div className="container mx-auto py-12 px-4 md:px-6">
          {/* Back button - uses client-side component for navigation */}
          <BackButton label={t('backToEvents')} fallbackUrl="/events" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event image */}
            <div className="lg:col-span-2">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={`/images/${event.track}.jpg`}
                  alt={trackName}
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className={`absolute bottom-0 left-0 py-2 px-4 text-sm font-semibold ${
                    event.type === 'trackday'
                      ? 'bg-racing-red'
                      : 'bg-racing-black'
                  } text-white`}
                >
                  {types[event.type]}
                </div>

                {event.soldOut && (
                  <div className="absolute top-4 right-4 py-2 px-4 text-sm font-bold bg-racing-black text-white rounded">
                    {t('event.soldOut')}
                  </div>
                )}
              </div>
            </div>

            {/* Event details */}
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h1 className="text-2xl font-bold mb-4">
                {t('event.title', { track: trackName })}{' '}
                {countryFlags[event.country]}
              </h1>
              <div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <p className="font-medium">
                    {formatEventDate(event.date, locale)}
                  </p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <p className="font-medium">{event.time}</p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <p className="font-medium">
                    {trackName}, {countryName}
                  </p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Flag className="h-4 w-4 mr-2" />
                  <p className="font-medium">{types[event.type]}</p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Car className="h-4 w-4 mr-2" />
                  <p className="font-medium">
                    {t('kilometers', {
                      length:
                        event.track === 'spa-francorchamps'
                          ? 7.004
                          : event.track === 'zandvoort'
                            ? 4.259
                            : 3.5,
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <RegisterButton
                  label={
                    event.soldOut ? t('joinWaitingList') : t('registerForEvent')
                  }
                  disabled={event.soldOut}
                />
              </div>
            </div>
          </div>
          {/* Event description */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">{t('eventDetails')}</h2>
            <p className="mb-4">
              {t('event.detailedDescription', {
                track: trackName,
                country: countryName,
                fallback: `Join us for an exciting ${types[event.type].toLowerCase()} at ${trackName} in ${countryName}. Experience the thrill of racing on this amazing circuit with Auriga Racing.`,
              })}
            </p>
            <p className="mb-4">
              {t('event.whatToExpect', {
                fallback:
                  'During this event, you will have the opportunity to improve your driving skills, receive coaching from experienced drivers, and enjoy a full day of track time in a safe and controlled environment.',
              })}
            </p>
            <p>
              {t('event.requirements', {
                fallback:
                  "Participants must have a valid driver's license and their own vehicle in good condition. Safety equipment will be checked before the event. Please arrive at least 30 minutes before the start time for registration and briefing.",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Related events */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">{t('relatedEvents')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events
              .filter((e) => e.id !== eventId && e.track === event.track)
              .slice(0, 3)
              .map((relatedEvent) => (
                <EventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                  locale={locale}
                />
              ))}
          </div>
        </div>
      </div>
      
      {/* Booking section */}
      <BookingSection event={event} locale={locale} />
    </div>
  );
}
