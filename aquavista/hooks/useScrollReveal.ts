'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Attaches an IntersectionObserver to the returned ref.
 * When the element enters the viewport, the class `active` is added
 * (pairs with the `.reveal` CSS class in globals.css).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = '0px', once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
