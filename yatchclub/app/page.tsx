import HeroCarousel from '@/components/sections/HeroCarousel';
import StatsSection from '@/components/sections/StatsSection';
import FleetPreview from '@/components/sections/FleetPreview';
import TestimonialCarousel from '@/components/sections/TestimonialCarousel';
import ContactCTA from '@/components/sections/ContactCTA';
import { getHeroSlides, getStats, getTestimonials } from '@/services/homepage';
import { getFeaturedYachts } from '@/services/yachts';

export const revalidate = 60;

export default async function HomePage() {
  const [heroSlides, stats, testimonials, featuredYachts] = await Promise.all([
    getHeroSlides(),
    getStats(),
    getTestimonials(),
    getFeaturedYachts(6),
  ]);

  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <StatsSection stats={stats} />
      <FleetPreview yachts={featuredYachts} />
      <TestimonialCarousel testimonials={testimonials} />
      <ContactCTA />
    </>
  );
}
