'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  label: string;
  fallbackUrl: string;
}

export default function BackButton({ label, fallbackUrl }: BackButtonProps) {
  const router = useRouter();
  const [isExternalNavigation, setIsExternalNavigation] = useState(true);

  useEffect(() => {
    // Check if there's a previous entry in the session history
    if (window.history.length > 1) {
      // Check if the previous page is from the same origin
      // document.referrer will be empty if user navigated from outside the site
      const referrer = document.referrer;
      const isSameOrigin = referrer && referrer.startsWith(window.location.origin);
      setIsExternalNavigation(!isSameOrigin);
    }
  }, []);

  const handleClick = () => {
    if (isExternalNavigation) {
      // If user came from outside the site, navigate to the fallback URL
      router.push(fallbackUrl);
    } else {
      // Otherwise use the browser's back functionality
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center mb-8 text-white/80 hover:text-white transition-colors cursor-pointer"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      {label}
    </button>
  );
}
