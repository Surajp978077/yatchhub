import { HeroCarousel } from '@/components/home/HeroCarousel';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';
import { ContactCTA } from '@/components/home/ContactCTA';
import { YachtGrid } from '@/components/yachts/YachtGrid';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { LinkButton } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import {
  getHomepageSettings,
  getTestimonials,
} from '@/services/homepage';
import { getYachts } from '@/services/yachts';

export const revalidate = 120;

export default async function HomePage() {
  const [settings, yachts, testimonials] = await Promise.all([
    getHomepageSettings(),
    getYachts({ perPage: 6 }),
    getTestimonials(),
  ]);

  const allTestimonials = testimonials.length
    ? testimonials
    : settings.testimonials ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <HeroCarousel slides={settings.hero_slides ?? []} />

      {/* ── Stats ── */}
      <StatsSection stats={settings.stats ?? []} />

      {/* ── Fleet preview ── */}
      <section id="products" className="py-32 px-[5%] max-w-[1400px] mx-auto">
        <RevealWrapper>
          <SectionTitle
            title="Our Signature Fleet"
            subtitle="Hand-selected superyachts for the ultimate luxury travel experience."
          />
        </RevealWrapper>

        <YachtGrid yachts={yachts} />

        {yachts.length >= 6 && (
          <RevealWrapper className="text-center mt-16">
            <LinkButton href="/yachts" variant="outline" size="lg">
              View Full Fleet
            </LinkButton>
          </RevealWrapper>
        )}
      </section>

      {/* ── Testimonials ── */}
      <TestimonialCarousel testimonials={allTestimonials} />

      {/* ── Contact CTA ── */}
      <ContactCTA
        whatsappNumber={settings.whatsapp_number}
        socialLinks={settings.social_links}
      />

      {/* ── Footer ── */}
      <Footer
        tagline={settings.footer_tagline}
        socialLinks={settings.social_links}
      />
    </>
  );
}
