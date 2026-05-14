import type { Metadata } from 'next';
import YachtGrid from '@/components/yacht/YachtGrid';
import SectionTitle from '@/components/ui/SectionTitle';
import ContactCTA from '@/components/sections/ContactCTA';
import { getYachts } from '@/services/yachts';
import { SITE_NAME } from '@/lib/constants';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Fleet',
  description: `Explore the exclusive ${SITE_NAME} superyacht fleet. Find your perfect luxury charter.`,
};

interface YachtsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function YachtsPage({ searchParams }: YachtsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const { items: yachts, total, totalPages } = await getYachts(page);

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-40 pb-20 bg-gradient-to-b from-navy-deep to-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,166,107,0.05)_0%,_transparent_60%)]" />
        <div className="container mx-auto px-5 text-center relative">
          <span className="inline-block w-12 h-px bg-gold mb-6" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
            Our Signature Fleet
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {total > 0
              ? `${total} hand-selected superyachts for the ultimate luxury charter experience.`
              : 'Hand-selected superyachts for the ultimate luxury charter experience.'}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-5">
          <YachtGrid yachts={yachts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-16">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`/yachts?page=${p}`}
                  className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-medium transition-all duration-200 ${
                    p === page
                      ? 'bg-gold text-navy border-gold font-bold'
                      : 'border-white/10 text-white/60 hover:border-gold/50 hover:text-white'
                  }`}
                >
                  {p}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
