'use client';

import { useState, useEffect } from 'react';

/**
 * Returns `true` once the user has scrolled past `threshold` px.
 * Use to toggle a frosted / opaque navbar background.
 */
export function useNavbarScroll(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    // Initialise in case page is already scrolled on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
