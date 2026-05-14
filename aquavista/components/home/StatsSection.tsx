'use client';

import { useCounter } from '@/hooks/useCounter';
import type { StatItem } from '@/types';

interface StatCounterProps {
  stat: StatItem;
  delay?: number;
}

function StatCounter({ stat, delay = 0 }: StatCounterProps) {
  const { count, ref } = useCounter(stat.value, { duration: 2200 });

  return (
    <div
      ref={ref}
      className="text-center px-6 py-4"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-serif text-5xl md:text-6xl text-[#c9a66b] font-bold mb-2 tabular-nums">
        {count}{stat.suffix ?? ''}
      </div>
      <p className="text-white/50 uppercase tracking-[3px] text-xs font-medium">
        {stat.label}
      </p>
    </div>
  );
}

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-[#0a1128] border-t border-b border-white/5 py-16">
      <div className="max-w-[1400px] mx-auto px-[5%]">
        <div
          className={`grid gap-8
            ${stats.length <= 2 ? 'grid-cols-2' :
              stats.length === 3 ? 'grid-cols-3' :
              'grid-cols-2 md:grid-cols-4'}`}
        >
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
