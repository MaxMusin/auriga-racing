'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label: string;
  fallbackUrl: string;
}

export default function BackButton({ label, fallbackUrl }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Always navigate to the fallback URL (events list)
    router.push(fallbackUrl);
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
