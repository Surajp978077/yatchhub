import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { YachtCard } from './YachtCard';
import type { Yacht } from '@/types';

interface YachtGridProps {
  yachts: Yacht[];
}

export function YachtGrid({ yachts }: YachtGridProps) {
  if (!yachts.length) {
    return (
      <div className="text-center text-white/40 py-24 text-lg">
        No yachts found. Check back soon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {yachts.map((yacht, index) => (
        <RevealWrapper key={yacht.id} delay={index * 80}>
          <YachtCard yacht={yacht} />
        </RevealWrapper>
      ))}
    </div>
  );
}
