'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import SectionTitle from '@/components/ui/SectionTitle';
import type { TestimonialItem } from '@/types';

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const navigate = useCallback(
    (dir: 'prev' | 'next') => {
      setDirection(dir === 'next' ? 'right' : 'left');
      setCurrent((c) =>
        dir === 'next'
          ? (c + 1) % testimonials.length
          : (c - 1 + testimonials.length) % testimonials.length
      );
    },
    [testimonials.length]
  );

  useEffect(() => {
    const timer = setInterval(() => navigate('next'), 7000);
    return () => clearInterval(timer);
  }, [navigate]);

  if (!testimonials.length) return null;

  const item = testimonials[current];

  return (
    <section id="reviews" className="py-28 bg-gradient-to-b from-navy-mid/30 to-navy">
      <div className="container mx-auto px-5">
        <SectionTitle
          heading="Guest Experiences"
          subheading="What our guests say about sailing with AQUAVISTA"
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Gold quote icon */}
          <Quote className="w-16 h-16 text-gold/20 absolute -top-4 -left-4 md:-left-10" />

          {/* Testimonial card */}
          <div
            key={current}
            className={cn(
              'bg-white/[0.03] border border-white/10 rounded-2xl p-10 md:p-14 text-center',
              'animate-in fade-in slide-in-from-bottom-4 duration-500'
            )}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>

            <blockquote className="font-display text-xl md:text-2xl text-white/90 italic leading-relaxed mb-10">
              &ldquo;{item.quote}&rdquo;
            </blockquote>

            {/* Reviewer */}
            <div className="flex items-center justify-center gap-4">
              {item.avatarUrl ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/30">
                  <Image
                    src={item.avatarUrl}
                    alt={item.reviewerName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display font-bold text-lg">
                  {item.reviewerName.charAt(0)}
                </div>
              )}
              <div className="text-left">
                <p className="text-gold font-semibold">{item.reviewerName}</p>
                <p className="text-white/40 text-sm">
                  {item.reviewerTitle}
                  {item.reviewerCompany && `, ${item.reviewerCompany}`}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => navigate('prev')}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/80 border border-white/10 hover:border-gold flex items-center justify-center text-white transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    idx === current ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                  )}
                  aria-label={`Testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate('next')}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/80 border border-white/10 hover:border-gold flex items-center justify-center text-white transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
