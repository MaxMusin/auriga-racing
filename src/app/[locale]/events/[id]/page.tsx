import { Calendar, Clock, Flag, MapPin, ArrowLeft, Users, Car } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RegisterButton from '@/components/RegisterButton';

// Import the event data
import { events, tracks, types, countryFlags, formatEventDate } from '@/data/events';

export async function generateMetadata({ params }: { params: { id: string; locale: string } }) {
  const eventId = params.id;
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
    description: `${t('event.description', { track: trackName, date: formatEventDate(event.date, params.locale) })}`,
  };
}

export default async function EventPage({ params }: { params: { id: string; locale: string } }) {
  const eventId = params.id;
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    notFound();
  }

  const t = await getTranslations('events');
  const trackName = tracks[event.track];
  const countryName = t(`countries.${event.country}`);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Back button */}
      <Link 
        href="/#events" 
        className="inline-flex items-center mb-8 text-racing-red hover:text-racing-red/80 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('backToEvents')}
      </Link>

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
            <div className={`absolute bottom-0 left-0 py-2 px-4 text-sm font-semibold ${
              event.type === 'trackday' ? 'bg-racing-red' : 'bg-racing-black'
            } text-white`}>
              {types[event.type]}
            </div>
          </div>
        </div>

        {/* Event details */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            {t('track', { track: trackName })} {countryFlags[event.country]}
          </h1>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('date')}</p>
                <p className="font-medium">{formatEventDate(event.date, params.locale)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('time')}</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('location')}</p>
                <p className="font-medium">{trackName}, {countryName}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Flag className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('eventType')}</p>
                <p className="font-medium">{types[event.type]}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Users className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('participants')}</p>
                <p className="font-medium">{t('maxParticipants', { count: 20 })}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Car className="h-5 w-5 mr-3 text-racing-red" />
              <div>
                <p className="text-sm text-muted-foreground">{t('trackLength')}</p>
                <p className="font-medium">{t('kilometers', { length: event.track === 'spa-francorchamps' ? 7.004 : event.track === 'zandvoort' ? 4.259 : 3.5 })}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <RegisterButton label={t('registerForEvent')} />
          </div>
        </div>
      </div>

      {/* Event description */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">{t('eventDetails')}</h2>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <p className="mb-4">
            {t('event.detailedDescription', { 
              track: trackName, 
              country: countryName,
              fallback: `Join us for an exciting ${types[event.type].toLowerCase()} at ${trackName} in ${countryName}. Experience the thrill of racing on this amazing circuit with Auriga Racing.`
            })}
          </p>
          <p className="mb-4">
            {t('event.whatToExpect', {
              fallback: 'During this event, you will have the opportunity to improve your driving skills, receive coaching from experienced drivers, and enjoy a full day of track time in a safe and controlled environment.'
            })}
          </p>
          <p>
            {t('event.requirements', {
              fallback: 'Participants must have a valid driver\'s license and their own vehicle in good condition. Safety equipment will be checked before the event. Please arrive at least 30 minutes before the start time for registration and briefing.'
            })}
          </p>
        </div>
      </div>

      {/* Related events */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">{t('relatedEvents')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events
            .filter(e => e.id !== eventId && e.track === event.track)
            .slice(0, 3)
            .map(relatedEvent => (
              <Link
                key={relatedEvent.id}
                href={`/events/${relatedEvent.id}`}
                className="block bg-background rounded-lg overflow-hidden shadow-md card-hover"
              >
                <div className="h-40 overflow-hidden relative">
                  <Image
                    fill
                    src={`/images/${relatedEvent.track}.jpg`}
                    alt={tracks[relatedEvent.track]}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute bottom-0 left-0 py-1 px-3 text-xs font-semibold ${
                      relatedEvent.type === 'trackday' ? 'bg-racing-red' : 'bg-racing-black'
                    } text-white`}
                  >
                    {types[relatedEvent.type]}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1">
                    {t('track', { track: tracks[relatedEvent.track] })}{' '}
                    {countryFlags[relatedEvent.country]}
                  </h3>

                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatEventDate(relatedEvent.date, params.locale)}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
