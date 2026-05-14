import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Yacht } from '@/types';

interface YachtCardProps {
  yacht: Yacht;
}

export function YachtCard({ yacht }: YachtCardProps) {
  const { slug, title, acf } = yacht;
  const { featured_image, short_description, pricing, specifications } = acf;

  return (
    <Link
      href={`/yachts/${slug}`}
      className="group glass-card rounded-2xl overflow-hidden block
        hover:-translate-y-2 hover:border-[#c9a66b]/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={featured_image?.url ?? '/images/placeholder-yacht.jpg'}
          alt={featured_image?.alt ?? title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/80 to-transparent opacity-60" />

        {/* Price badge */}
        {pricing?.starting_from && (
          <div className="absolute top-4 right-4 bg-[#c9a66b] text-[#0a1128] text-xs font-bold px-3 py-1.5 rounded">
            From {pricing.currency ?? '$'}{pricing.starting_from}
            {pricing.period ? ` / ${pricing.period}` : ''}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-7">
        {/* Specs chips */}
        {(specifications?.length || specifications?.guests) && (
          <div className="flex gap-4 mb-3">
            {specifications.length && (
              <span className="text-[#c9a66b] text-xs font-semibold tracking-wide">
                {specifications.length}
              </span>
            )}
            {specifications.guests && (
              <span className="text-[#c9a66b] text-xs font-semibold tracking-wide">
                {specifications.guests} Guests
              </span>
            )}
          </div>
        )}

        <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#c9a66b] transition-colors">
          {title}
        </h3>

        <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
          {short_description}
        </p>

        <div className="flex items-center text-[#c9a66b] text-sm font-semibold gap-1
          group-hover:gap-3 transition-all duration-300">
          View Details <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
