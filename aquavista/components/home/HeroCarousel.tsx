'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { LinkButton } from '@/components/ui/Button';
import type { HeroSlide } from '@/types';

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const { current, next, prev, goTo } = useCarousel({
    total: slides.length,
    autoPlayInterval: 6000,
  });

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Background image */}
          <Image
            src={slide.image.url}
            alt={slide.image.alt}
            fill
            priority={index === 0}
            className="object-cover brightness-[0.55]"
            sizes="100vw"
          />

          {/* Hero text content */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-3xl">
              <span
                className={`block text-[#c9a66b] uppercase tracking-[6px] text-sm font-semibold mb-4
                  transition-all duration-700 delay-200
                  ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                Exclusive Yacht Charters
              </span>
              <h1
                className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white font-black leading-tight mb-6
                  transition-all duration-700 delay-300
                  ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {slide.headline}
              </h1>
              <p
                className={`text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed
                  transition-all duration-700 delay-[400ms]
                  ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                {slide.subheadline}
              </p>
              <div
                className={`transition-all duration-700 delay-500
                  ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <LinkButton href={slide.cta_link} size="lg">
                  {slide.cta_label}
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 flex items-center justify-center
              border border-white/20 text-white/60 hover:border-[#c9a66b] hover:text-[#c9a66b]
              rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 flex items-center justify-center
              border border-white/20 text-white/60 hover:border-[#c9a66b] hover:text-[#c9a66b]
              rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full
                ${index === current
                  ? 'bg-[#c9a66b] w-8 h-2'
                  : 'bg-white/30 hover:bg-white/60 w-2 h-2'
                }`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
