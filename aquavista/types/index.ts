// ─── WordPress REST API shapes ────────────────────────────────────────────────

export interface WPImage {
  id: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface YachtSpecifications {
  length?: string;
  year_built?: string;
  max_speed?: string;
  crew?: string;
  staterooms?: string;
  guests?: string;
  [key: string]: string | undefined; // Allow arbitrary spec pairs
}

export interface YachtPricing {
  starting_from?: string;
  currency?: string;
  period?: string; // e.g. "per week", "per day"
  note?: string;
}

/** ACF fields returned by the WordPress REST API for the "yachts" CPT */
export interface YachtACF {
  gallery: WPImage[];
  youtube_link: string;
  pricing: YachtPricing;
  specifications: YachtSpecifications;
  activities: string[];
  short_description: string;
  featured_image: WPImage;
}

export interface Yacht {
  id: number;
  slug: string;
  title: string;
  content: string;         // Full rich-text description (rendered HTML)
  acf: YachtACF;
  date: string;
}

// ─── Homepage / Options ───────────────────────────────────────────────────────

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;         // e.g. "%", "+"
}

export interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  author_title?: string;
  avatar?: WPImage;
}

export interface HeroSlide {
  id: number;
  headline: string;

  subheadline: string;
  image: WPImage;
  cta_label: string;
  cta_link: string;
}

export interface SocialLinks {
  instagram?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
  facebook?: string;
  youtube?: string;
}

export interface HomepageSettings {
  hero_slides: HeroSlide[];
  stats: StatItem[];
  testimonials: Testimonial[];
  social_links: SocialLinks;
  whatsapp_number: string;
  footer_tagline: string;
}

// ─── API response wrappers ────────────────────────────────────────────────────

export interface WPPost<T = Record<string, unknown>> {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  acf: T;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

export interface WPOptionsResponse {
  acf: HomepageSettings;
}

// ─── Component prop types ─────────────────────────────────────────────────────

export interface YachtCardProps {
  yacht: Yacht;
}

export interface ButtonVariant {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
