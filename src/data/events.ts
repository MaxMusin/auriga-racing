export interface EventItem {
  id: string;
  date: string;
  time: string;
  type: 'trackday' | 'simracing';
  track: string;
  country: 'belgium' | 'france' | 'netherlands';
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
  'magny-cours': 'Magny-Cours',
  zandvoort: 'Zandvoort',
};

export const events: EventItem[] = [
  {
    id: 'spa-2025-03-26',
    date: '26 mars 2025',
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'spa-francorchamps',
    country: 'belgium',
  },
  {
    id: 'spa-2025-03-27',
    date: '27 mars 2025',
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'spa-francorchamps',
    country: 'belgium',
  },
  {
    id: 'mettet-2025-04-29',
    date: '29 avril 2025',
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
  },
  {
    id: 'mettet-2025-05-26',
    date: '26 mai 2025',
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'mettet',
    country: 'belgium',
  },
  {
    id: 'clastres-2025-06-27',
    date: '27 juin 2025',
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
  },
  {
    id: 'magny-cours-2025-08-20',
    date: '20 août 2025',
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'magny-cours',
    country: 'france',
  },
  {
    id: 'clastres-2025-08-28',
    date: '28 août 2025',
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
  },
  {
    id: 'clastres-2025-09-18',
    date: '18 septembre 2025',
    time: '9h00 - 18h00',
    type: 'trackday',
    track: 'clastres',
    country: 'france',
  },
  {
    id: 'zandvoort-2025-10-17',
    date: '17 octobre 2025',
    time: '9h30 - 18h00',
    type: 'trackday',
    track: 'zandvoort',
    country: 'netherlands',
  },
];
