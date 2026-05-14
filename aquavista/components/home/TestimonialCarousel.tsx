'use client';

import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionTitle } from '@/components/ui/SectionTitle';
import type { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const { current, next, prev, goTo } = useCarousel({
    total: testimonials.length,
    autoPlayInterval: 7000,
  });

  if (!testimonials.length) return null;

  return (
    <section id="reviews" className="py-32 bg-black/20">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <RevealWrapper>
          <SectionTitle
            title="Guest Experiences"
            subtitle="What our clients say about chartering with Aquavista."
          />
        </RevealWrapper>

        <RevealWrapper delay={150}>
          <div className="relative max-w-3xl mx-auto">
            {/* Quote icon */}
            <div className="flex justify-center mb-8">
              <Quote
                size={48}
                className="text-[#c9a66b]/30 rotate-180"
                fill="currentColor"
              />
            </div>

            {/* Slide area */}
            <div className="overflow-hidden min-h-[200px] relative">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className={`transition-all duration-700 absolute inset-0 text-center
                    ${index === current
                      ? 'opacity-100 translate-x-0'
                      : index < current
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                    }`}
                >
                  <p className="text-white/80 text-xl md:text-2xl italic leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    {t.avatar && (
                      <Image
                        src={t.avatar.url}
                        alt={t.author_name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    )}
                    <div className="text-left">
                      <span className="block text-[#c9a66b] font-bold tracking-wide">
                        {t.author_name}
                      </span>
                      {t.author_title && (
                        <span className="text-white/40 text-sm">{t.author_title}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-16">
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="w-10 h-10 flex items-center justify-center border border-white/20
                    text-white/50 hover:border-[#c9a66b] hover:text-[#c9a66b] rounded-full transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Testimonial ${i + 1}`}
                      className={`rounded-full transition-all duration-300
                        ${i === current
                          ? 'bg-[#c9a66b] w-6 h-2'
                          : 'bg-white/20 hover:bg-white/40 w-2 h-2'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next"
                  className="w-10 h-10 flex items-center justify-center border border-white/20
                    text-white/50 hover:border-[#c9a66b] hover:text-[#c9a66b] rounded-full transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
