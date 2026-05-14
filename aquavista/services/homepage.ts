/**
 * Homepage / global settings API calls.
 *
 * WordPress setup required:
 *  - ACF Options Page (via acf_add_options_page) with field group:
 *      "Homepage Settings" containing: hero_slides, stats, testimonials,
 *      social_links, whatsapp_number, footer_tagline
 *  - Endpoint exposed via ACF to REST API plugin at:
 *      /wp-json/acf/v3/options/options
 *
 *  Testimonials can also be a CPT with endpoint:
 *      /wp-json/wp/v2/testimonials
 */

import { wpFetch, buildQuery } from './api';
import type {
  HomepageSettings,
  HeroSlide,
  StatItem,
  Testimonial,
  SocialLinks,
  WPPost,
} from '@/types';

interface ACFOptionsResponse {
  acf: HomepageSettings;
}

interface TestimonialACF {
  quote: string;
  author_name: string;
  author_title?: string;
  avatar?: { url: string; alt: string };
}

// ─── Fallback data (used during dev before WP is connected) ──────────────────
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: 1,
    headline: 'Sail Into Luxury',
    subheadline:
      "Experience the world's most breathtaking destinations on our exclusive superyachts.",
    image: { id: 1, url: '/images/hero-1.jpg', alt: 'Luxury Yacht at Sunset' },
    cta_label: 'Explore Fleet',
    cta_link: '/yachts',
  },
  {
    id: 2,
    headline: 'Unmatched Elegance',
    subheadline:
      'Discover the finest maritime engineering combined with ultra-premium hospitality.',
    image: { id: 2, url: '/images/hero-2.jpg', alt: 'Yacht at Monaco' },
    cta_label: 'View Designs',
    cta_link: '/yachts',
  },
];

const FALLBACK_STATS: StatItem[] = [
  { label: 'Annual Bookings', value: 150, suffix: '+' },
  { label: 'Elite Yachts', value: 45, suffix: '+' },
  { label: 'Recurring Clients', value: 85, suffix: '%' },
  { label: 'Global Awards', value: 12 },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "The most seamless and luxurious vacation we've ever had. The crew's attention to detail was beyond anything we expected.",
    author_name: 'James Henderson',
    author_title: 'CEO, Global Tech',
  },
  {
    id: 2,
    quote:
      'Every detail was perfect — from the moment we boarded to the final sunset. Aquavista set a new standard for luxury at sea.',
    author_name: 'Sophia Marchetti',
    author_title: 'Creative Director',
  },
  {
    id: 3,
    quote:
      'We have chartered yachts across the Mediterranean for a decade. Aquavista remains unrivalled in quality and service.',
    author_name: 'Dr. Richard Osei',
    author_title: 'Founder, Osei Capital',
  },
];

const FALLBACK_SOCIAL: SocialLinks = {
  instagram: 'https://instagram.com',
  whatsapp: 'https://wa.me/1234567890',
  phone: 'tel:+1234567890',
  email: 'mailto:charter@aquavista.com',
};

// ─── Fetch functions ──────────────────────────────────────────────────────────

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const data = await wpFetch<ACFOptionsResponse>('/acf/v3/options/options', {
      revalidate: 120,
    });
    return data.acf;
  } catch {
    // Return fallback data when WordPress is not yet connected
    return {
      hero_slides: FALLBACK_SLIDES,
      stats: FALLBACK_STATS,
      testimonials: FALLBACK_TESTIMONIALS,
      social_links: FALLBACK_SOCIAL,
      whatsapp_number: '+1234567890',
      footer_tagline: 'Redefining luxury travel since 2010.',
    };
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const query = buildQuery({ per_page: 10, _fields: 'id,acf' });
    const raw = await wpFetch<WPPost<TestimonialACF>[]>(
      `/wp/v2/testimonials${query}`,
      { revalidate: 300 },
    );

    return raw.map((t) => ({
      id: t.id,
      quote: t.acf?.quote ?? '',
      author_name: t.acf?.author_name ?? '',
      author_title: t.acf?.author_title,
      avatar: t.acf?.avatar ? { id: 0, ...t.acf.avatar } : undefined,
    }));
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const settings = await getHomepageSettings();
    return settings.hero_slides ?? FALLBACK_SLIDES;
  } catch {
    return FALLBACK_SLIDES;
  }
}

export async function getStats(): Promise<StatItem[]> {
  try {
    const settings = await getHomepageSettings();
    return settings.stats ?? FALLBACK_STATS;
  } catch {
    return FALLBACK_STATS;
  }
}

export async function getSocialLinks(): Promise<SocialLinks> {
  try {
    const settings = await getHomepageSettings();
    return settings.social_links ?? FALLBACK_SOCIAL;
  } catch {
    return FALLBACK_SOCIAL;
  }
}
