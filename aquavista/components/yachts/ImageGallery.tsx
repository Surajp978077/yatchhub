'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { WPImage } from '@/types';

interface ImageGalleryProps {
  images: WPImage[];
  title?: string;
}

export function ImageGallery({ images, title = '' }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!images.length) return null;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const lightboxPrev = () =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const lightboxNext = () =>
    setLightboxIndex((i) => (i + 1) % images.length);

  return (
    <>
      {/* Main gallery */}
      <div className="space-y-3">
        {/* Hero image */}
        <div
          className="relative rounded-xl overflow-hidden h-80 md:h-[480px] cursor-zoom-in group"
          onClick={() => openLightbox(activeIndex)}
        >
          <Image
            src={images[activeIndex].url}
            alt={images[activeIndex].alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
          </div>
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, index) => (
              <button
                key={img.id || index}
                onClick={() => setActiveIndex(index)}
                className={`gallery-thumb flex-shrink-0 relative w-20 h-16 rounded-lg overflow-hidden
                  border-2 transition-all duration-300
                  ${index === activeIndex ? 'border-[#c9a66b]' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || `Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/60 hover:text-[#c9a66b] transition-colors"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            <div className="relative h-[70vh] rounded-xl overflow-hidden">
              <Image
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].alt || title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={lightboxPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                    border border-white/20 text-white/60 hover:border-[#c9a66b] hover:text-[#c9a66b]
                    rounded-full transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={lightboxNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center
                    border border-white/20 text-white/60 hover:border-[#c9a66b] hover:text-[#c9a66b]
                    rounded-full transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>

                <p className="text-center text-white/40 text-sm mt-4">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
