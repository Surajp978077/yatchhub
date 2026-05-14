import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import YachtGrid from '@/components/yacht/YachtGrid';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import type { YachtCard } from '@/types';

interface FleetPreviewProps {
  yachts: YachtCard[];
}

export default function FleetPreview({ yachts }: FleetPreviewProps) {
  return (
    <section id="fleet" className="py-28 bg-navy">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionTitle
            heading="Our Signature Fleet"
            subheading="Hand-selected superyachts for the ultimate luxury travel experience."
            align="left"
            className="mb-0"
          />
          <Link
            href="/yachts"
            className="hidden md:flex items-center gap-2 text-gold hover:text-gold-light text-sm font-semibold tracking-wider uppercase transition-colors shrink-0"
          >
            View All Yachts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <YachtGrid yachts={yachts} />

        <div className="mt-12 text-center md:hidden">
          <Button href="/yachts" variant="outline" size="md">
            View All Yachts
          </Button>
        </div>
      </div>
    </section>
  );
}
