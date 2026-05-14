'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms delay before reveal triggers (CSS transition-delay)
}

/**
 * Wraps any content with a scroll-triggered fade + slide-up reveal.
 * The `.reveal` class in globals.css handles the animation.
 */
export function RevealWrapper({ children, className = '', delay = 0 }: RevealWrapperProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
