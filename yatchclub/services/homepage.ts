import { wpFetch, acfFetch } from './api';
import { toTestimonialItem } from '@/utils/transformers';
import type { Testimonial, TestimonialItem, SiteSettings, StatItem, HeroSlide } from '@/types';
import { STATS_FALLBACK, HERO_SLIDES_FALLBACK } from '@/lib/constants';

// ─── Site Settings (ACF Options Page) ────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const data = await acfFetch<{ acf: SiteSettings }>('/options/site_settings');
    return data.acf;
  } catch {
    return null;
  }
}

// ─── Hero Slides ──────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const settings = await getSiteSettings();
    if (settings?.hero_slides?.length) return settings.hero_slides;
    return HERO_SLIDES_FALLBACK;
  } catch {
    return HERO_SLIDES_FALLBACK;
  }
}

// ─── Stats / Counters ─────────────────────────────────────────────────────────

export async function getStats(): Promise<StatItem[]> {
  try {
    const settings = await getSiteSettings();
    if (!settings?.stats) return STATS_FALLBACK;

    const { annual_bookings, elite_yachts, recurring_clients_percent, global_awards } =
      settings.stats;

    return [
      { label: 'Annual Bookings', target: annual_bookings, suffix: '+' },
      { label: 'Elite Yachts', target: elite_yachts, suffix: '+' },
      { label: 'Recurring Clients', target: recurring_clients_percent, suffix: '%' },
      { label: 'Global Awards', target: global_awards, suffix: '' },
    ];
  } catch {
    return STATS_FALLBACK;
  }
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const raw = await wpFetch<Testimonial[]>('/testimonials', {
      per_page: 10,
      _embed: true,
    });
    return raw.map(toTestimonialItem);
  } catch {
    return TESTIMONIALS_FALLBACK;
  }
}

// ─── Fallback Data ────────────────────────────────────────────────────────────

const TESTIMONIALS_FALLBACK: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'The most seamless and luxurious vacation we\'ve ever had. The crew\'s attention to detail was beyond anything we expected. Truly a five-star experience at sea.',
    reviewerName: 'James Henderson',
    reviewerTitle: 'CEO',
    reviewerCompany: 'Global Tech',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'An extraordinary voyage through the Mediterranean. Every detail was curated to perfection — from the cuisine to the destinations. We\'ll be returning every summer.',
    reviewerName: 'Sofia Laurent',
    reviewerTitle: 'Creative Director',
    reviewerCompany: 'Maison & Co.',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Our family\'s most memorable holiday. The children were engaged with water activities while we enjoyed the spa and fine dining. Simply incomparable.',
    reviewerName: 'Richard & Emma Ashton',
    reviewerTitle: 'Private Clients',
    rating: 5,
  },
];
