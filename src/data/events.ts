import { format, Locale } from 'date-fns';
import { enUS, fr, nl } from 'date-fns/locale';

export interface EventItem {
  id: string;
  date: Date;
  time: string;
  type: 'trackday' | 'simracing';
  track: string;
  country: 'belgium' | 'france' | 'netherlands';
  soldOut?: boolean;
  capacity?: number;
  registrations?: number;
  sessionPrice?: number;
  sessionTime?: string;
  braceletPrice?: number;
  cancel?: boolean;
}

export const countryFlags: Record<EventItem['country'], string> = {
  belgium: '🇧🇪',
  france: '🇫🇷',
  netherlands: '🇳🇱',
};

export const types = {
  trackday: 'Trackday',
  simracing: 'Simracing',
};

export const tracks: Record<string, string> = {
  'spa-francorchamps': 'Spa-Francorchamps',
  mettet: 'Mettet',
  clastres: 'Clastres',
  dijon: 'Dijon',
  'magny-cours': 'Magny-Cours',
  zandvoort: 'Zandvoort',
};

/**
 * Format a date using date-fns with the specified locale
 * @param date The date to format
 * @param localeCode The locale code (e.g., 'fr', 'en')
 */
export const formatEventDate = (
  date: Date,
  localeCode: string = 'en',
): string => {
  const locales: Record<string, Locale> = {
    fr,
    en: enUS,
    nl,
  };

  const locale = locales[localeCode] || enUS;
  return format(date, 'd MMMM yyyy', { locale });
};

export const events: EventItem[] = [
  {
    id: 'spa-2025-03-26',
    date: new Date(2025, 2, 26), // March is 2 (0-indexed)
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'spa-francorchamps',
    country: 'belgium',
    soldOut: true,
    capacity: 18,
    registrations: 18,
    sessionPrice: 200,
    sessionTime: '20 min',
    braceletPrice: 50,
  },
  {
    id: 'spa-2025-03-27',
    date: new Date(2025, 2, 27),
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'spa-francorchamps',
    country: 'belgium',
    soldOut: true,
    capacity: 18,
    registrations: 18,
    sessionPrice: 200,
    sessionTime: '20 min',
    braceletPrice: 50,
  },
  {
    id: 'mettet-2025-04-29',
    date: new Date(2025, 3, 29),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
    soldOut: true,
    capacity: 18,
    registrations: 18,
    sessionPrice: 150,
    sessionTime: '20 min',
    braceletPrice: 50,
  },
  {
    id: 'mettet-2025-05-26',
    date: new Date(2025, 4, 26),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
    soldOut: false,
    capacity: 18,
    registrations: 4,
    sessionPrice: 150,
    sessionTime: '20 min',
    braceletPrice: 33,
  },
  {
    id: 'clastres-2025-06-27',
    date: new Date(2025, 5, 27),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
    soldOut: false,
    capacity: 18,
    registrations: 16,
    sessionPrice: 150,
    sessionTime: '20 min',
  },
  {
    id: 'mettet-2025-08-16',
    date: new Date(2025, 7, 16),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
    soldOut: false,
    capacity: 18,
    registrations: 0,
    sessionPrice: 150,
    sessionTime: '20 min',
    braceletPrice: 33,
  },
  {
    id: 'mettet-2025-08-17',
    date: new Date(2025, 7, 17),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
    soldOut: false,
    capacity: 18,
    registrations: 0,
    sessionPrice: 150,
    sessionTime: '20 min',
    braceletPrice: 33,
  },
  {
    id: 'dijon-2025-08-18',
    date: new Date(2025, 7, 18),
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'dijon',
    country: 'france',
    soldOut: false,
    capacity: 18,
    registrations: 3,
    sessionPrice: 200,
    sessionTime: '20min',
    braceletPrice: 50,
    cancel: true,
  },
  {
    id: 'magny-cours-2025-08-20',
    date: new Date(2025, 7, 20),
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'magny-cours',
    country: 'france',
    soldOut: false,
    capacity: 18,
    registrations: 8,
    sessionPrice: 200,
    sessionTime: '20min',
    braceletPrice: 50,
    cancel: true,
  },
  {
    id: 'clastres-2025-08-28',
    date: new Date(2025, 7, 28),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
    soldOut: false,
    capacity: 18,
    registrations: 5,
    sessionPrice: 150,
    sessionTime: '20min',
  },
  {
    id: 'clastres-2025-09-18',
    date: new Date(2025, 8, 18),
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
    soldOut: false,
    capacity: 18,
    registrations: 3,
    sessionPrice: 150,
    sessionTime: '20min',
  },
  {
    id: 'zandvoort-2025-10-17',
    date: new Date(2025, 9, 17),
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'zandvoort',
    country: 'netherlands',
    soldOut: false,
    capacity: 18,
    registrations: 9,
    sessionPrice: 200,
    sessionTime: '20min',
    braceletPrice: 50,
  },
];
