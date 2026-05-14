import Link from 'next/link';
import Image from 'next/image';
import { Users, Ruler, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { YachtCard as YachtCardType } from '@/types';
import { FALLBACK_IMAGE } from '@/lib/constants';

interface YachtCardProps {
  yacht: YachtCardType;
  className?: string;
}

export default function YachtCard({ yacht, className }: YachtCardProps) {
  return (
    <Link
      href={`/yachts/${yacht.slug}`}
      className={cn(
        'group block bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden',
        'hover:border-gold/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40',
        'transition-all duration-500 backdrop-blur-sm',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={yacht.featuredImage || FALLBACK_IMAGE}
          alt={yacht.featuredImageAlt || yacht.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

        {/* Pricing badge */}
        {yacht.pricing && (
          <div className="absolute top-4 right-4 bg-gold/90 text-navy text-xs font-bold px-3 py-1.5 rounded-full tracking-wide backdrop-blur-sm">
            From {yacht.pricing}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
          {yacht.title}
        </h3>

        {/* Meta specs */}
        {(yacht.length || yacht.guests) && (
          <div className="flex items-center gap-5 mb-3">
            {yacht.length && (
              <span className="flex items-center gap-1.5 text-gold text-sm font-semibold">
                <Ruler className="w-3.5 h-3.5" />
                {yacht.length}
              </span>
            )}
            {yacht.guests && (
              <span className="flex items-center gap-1.5 text-gold text-sm font-semibold">
                <Users className="w-3.5 h-3.5" />
                {yacht.guests} Guests
              </span>
            )}
          </div>
        )}

        <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-2">
          {yacht.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30 uppercase tracking-widest">View Details</span>
          <span className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
            <ArrowRight className="w-3.5 h-3.5 text-gold group-hover:text-navy transition-colors duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}
