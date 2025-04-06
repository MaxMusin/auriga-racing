'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  delay = 0,
  suffix = '',
  className = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up intersection observer to trigger animation when element is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          // Add delay before starting the animation
          setTimeout(() => {
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className={className}>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
