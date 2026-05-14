'use client';

import { useInView } from '@/hooks/useInView';
import { useCounter } from '@/hooks/useCounter';
import { cn } from '@/utils/cn';
import type { StatItem } from '@/types';
import { STATS_FALLBACK } from '@/lib/constants';

interface StatCounterProps {
  item: StatItem;
  start: boolean;
  index: number;
}

function StatCounter({ item, start, index }: StatCounterProps) {
  const count = useCounter({ target: item.target, start, duration: 2200 });

  return (
    <div
      className={cn(
        'text-center px-6 py-2 transition-all duration-700',
        start ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <p className="font-display text-5xl md:text-6xl font-bold text-gold mb-2">
        {item.prefix || ''}{count}{item.suffix || ''}
      </p>
      <p className="text-white/50 text-sm uppercase tracking-[3px]">{item.label}</p>
    </div>
  );
}

interface StatsSectionProps {
  stats?: StatItem[];
}

export default function StatsSection({ stats = STATS_FALLBACK }: StatsSectionProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <section ref={ref} className="bg-navy border-y border-white/5 py-20">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/10">
          {stats.map((item, idx) => (
            <StatCounter key={item.label} item={item} start={inView} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
