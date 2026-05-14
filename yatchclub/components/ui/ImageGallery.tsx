'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { WPImage } from '@/types';

interface ImageGalleryProps {
  images: WPImage[];
  className?: string;
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : 0));

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 md:grid-cols-3 gap-3',
          className
        )}
      >
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => openLightbox(idx)}
            className={cn(
              'relative overflow-hidden rounded-lg group cursor-pointer',
              idx === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square'
            )}
          >
            <Image
              src={img.url}
              alt={img.alt || `Gallery image ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || ''}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-10 p-2 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <span className="absolute bottom-6 text-white/50 text-sm">
            {lightboxIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
