'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import type { HeroSlide } from '@/types';
import { HERO_SLIDES_FALLBACK } from '@/lib/constants';

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

const SLIDE_INTERVAL = 6000;

export default function HeroCarousel({ slides = HERO_SLIDES_FALLBACK }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 800);
    },
    [isAnimating]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, slides.length, goTo]
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, slides.length, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-navy">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            idx === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          {/* Background */}
          {slide.image ? (
            <Image
              src={slide.image.url}
              alt={slide.image.alt || slide.heading}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-navy via-navy-mid to-[#0d1f3c]"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div
              className={cn(
                'max-w-3xl transition-all duration-700',
                idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: idx === current ? '200ms' : '0ms' }}
            >
              {/* Decorative line */}
              <span className="inline-block w-16 h-px bg-gold mb-6 opacity-80" />
              
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
                {slide.heading}
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed">
                {slide.subheading}
              </p>
              <Button href={slide.cta_link} size="lg">
                {slide.cta_text}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-gold/80 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-gold"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-gold/80 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-gold"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              'transition-all duration-300 rounded-full',
              idx === current
                ? 'w-8 h-1.5 bg-gold'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            )}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase rotate-90 origin-right translate-x-4">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gold animate-[scrollIndicator_2s_ease-in-out_infinite]" style={{ height: '40%' }} />
        </div>
      </div>
    </section>
  );
}
