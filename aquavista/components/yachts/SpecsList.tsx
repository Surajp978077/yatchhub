import { Check } from 'lucide-react';
import type { YachtSpecifications } from '@/types';

interface SpecsListProps {
  specifications: YachtSpecifications;
}

interface ActivitiesListProps {
  activities: string[];
}

const SPEC_LABEL_MAP: Record<string, string> = {
  length: 'Length',
  year_built: 'Year Built',
  max_speed: 'Max Speed',
  crew: 'Crew',
  staterooms: 'Staterooms',
  guests: 'Max Guests',
};

function formatLabel(key: string): string {
  return SPEC_LABEL_MAP[key] ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SpecsList({ specifications }: SpecsListProps) {
  const entries = Object.entries(specifications).filter(([, v]) => v);

  if (!entries.length) return null;

  return (
    <div>
      <h3 className="text-[#c9a66b] uppercase tracking-[3px] text-xs font-semibold mb-4">
        Specifications
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {entries.map(([key, value]) => (
          <div key={key} className="glass-card rounded-lg p-4">
            <span className="block text-white/40 text-xs uppercase tracking-wider mb-1">
              {formatLabel(key)}
            </span>
            <span className="text-white font-semibold text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
  if (!activities.length) return null;

  return (
    <div>
      <h3 className="text-[#c9a66b] uppercase tracking-[3px] text-xs font-semibold mb-4">
        Activities &amp; Amenities
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {activities.map((activity) => (
          <li key={activity} className="flex items-center gap-2 text-white/70 text-sm">
            <Check size={14} className="text-[#c9a66b] flex-shrink-0" />
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
