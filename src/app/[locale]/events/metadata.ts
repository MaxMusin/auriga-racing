import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('events');

  return {
    title: t('fullCalendar'),
    description: t('description'),
    icons: {
      icon: '/images/auriga_racing__logo.svg',
    },
    other: {
      'thumbnail': '/images/auriga-racing-car.jpg',
      'image': '/images/auriga-racing-car.jpg',
    },
  };
}
