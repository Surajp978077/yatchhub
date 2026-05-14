import type { Metadata } from 'next';
import { YachtGrid } from '@/components/yachts/YachtGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Footer } from '@/components/layout/Footer';
import { getYachts } from '@/services/yachts';
import { getHomepageSettings } from '@/services/homepage';

export const metadata: Metadata = {
  title: 'Our Fleet',
  description:
    'Browse our exclusive collection of luxury superyachts available for charter worldwide.',
};

export const revalidate = 300;

export default async function YachtsPage() {
  const [yachts, settings] = await Promise.all([
    getYachts({ perPage: 50 }),
    getHomepageSettings(),
  ]);

  return (
    <>
      {/* Page hero banner */}
      <section className="relative pt-40 pb-20 px-[5%] bg-[#0a1128] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/fleet-banner.jpg')] bg-cover bg-center brightness-[0.2]" />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <span className="block text-[#c9a66b] uppercase tracking-[5px] text-sm font-semibold mb-4">
            Exclusive Charter Fleet
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-black">
            Our Signature Fleet
          </h1>
          <p className="text-white/50 mt-6 text-lg max-w-xl mx-auto">
            Every yacht in our fleet represents the pinnacle of maritime luxury. Choose your vessel and set sail.
          </p>
        </div>
      </section>

      {/* Yacht grid */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <SectionTitle
            title={`${yachts.length > 0 ? yachts.length + ' ' : ''}Yachts Available`}
            subtitle="Filter by size, destination, or amenities — or simply browse and be inspired."
          />
          <YachtGrid yachts={yachts} />
        </div>
      </section>

      <Footer
        tagline={settings.footer_tagline}
        socialLinks={settings.social_links}
      />
    </>
  );
}
