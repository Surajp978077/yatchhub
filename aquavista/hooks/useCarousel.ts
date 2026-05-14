'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseCarouselOptions {
  total: number;
  autoPlayInterval?: number; // ms, 0 = disabled
}

export function useCarousel({ total, autoPlayInterval = 5000 }: UseCarouselOptions) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const goTo = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    if (!autoPlayInterval || total <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval, total]);

  return { current, next, prev, goTo };
}
