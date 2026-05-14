'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCounterOptions {
  duration?: number; // ms
  start?: number;
}

/**
 * Animates a number from `start` to `end` over `duration` ms.
 * The counter starts only when the trigger ref enters the viewport.
 */
export function useCounter(
  end: number,
  options: UseCounterOptions = {},
): { count: number; ref: React.RefObject<HTMLDivElement | null> } {
  const { duration = 2000, start = 0 } = options;
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out quad
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, start, duration]);

  return { count, ref };
}
