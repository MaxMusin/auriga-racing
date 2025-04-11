// src/app/[locale]/page.tsx

'use client';

import LandingView from '@/views/landing/LandingView';

// We don't need to use the locale parameter directly in this component
export default function Home() {
  return <LandingView />;
}
