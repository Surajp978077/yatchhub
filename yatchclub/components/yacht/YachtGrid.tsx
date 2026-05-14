import YachtCard from './YachtCard';
import type { YachtCard as YachtCardType } from '@/types';
import { cn } from '@/utils/cn';

interface YachtGridProps {
  yachts: YachtCardType[];
  className?: string;
}

export default function YachtGrid({ yachts, className }: YachtGridProps) {
  if (!yachts.length) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40 text-lg">No yachts available at the moment.</p>
        <p className="text-white/25 text-sm mt-2">Please check back soon.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
        className
      )}
    >
      {yachts.map((yacht) => (
        <YachtCard key={yacht.id} yacht={yacht} />
      ))}
    </div>
  );
}
