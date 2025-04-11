import { getTranslations } from 'next-intl/server';
import ContactPage from '@/views/contact/ContactPage';

export async function generateMetadata() {
  const t = await getTranslations('contact.meta');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  return <ContactPage />;
}
