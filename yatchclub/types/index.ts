// ─── WordPress REST API Base ──────────────────────────────────────────────────

export interface WPImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface WPPost {
  id: number;
  slug: string;
  status: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: { width: number; height: number };
    }>;
  };
}

// ─── Yacht ────────────────────────────────────────────────────────────────────

export interface YachtSpecification {
  label: string;
  value: string;
}

export interface YachtACF {
  short_description: string;
  gallery: WPImage[] | false;
  youtube_link: string;
  pricing: string;
  specifications: YachtSpecification[] | string;
  activities: string[] | string;
  featured_image: WPImage | false;
  length?: string;
  guests?: string;
  crew?: string;
  year_built?: string;
}

export interface Yacht extends WPPost {
  acf: YachtACF;
}

export interface YachtCard {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  pricing: string;
  featuredImage: string;
  featuredImageAlt: string;
  length?: string;
  guests?: string;
}

export interface YachtDetail extends YachtCard {
  content: string;
  gallery: WPImage[];
  youtubeLink: string;
  specifications: YachtSpecification[];
  activities: string[];
  crew?: string;
  yearBuilt?: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface TestimonialACF {
  quote: string;
  reviewer_name: string;
  reviewer_title: string;
  reviewer_company?: string;
  avatar?: WPImage | false;
  rating?: number;
}

export interface Testimonial extends WPPost {
  acf: TestimonialACF;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerCompany?: string;
  avatarUrl?: string;
  rating: number;
}

// ─── Homepage Stats ───────────────────────────────────────────────────────────

export interface StatItem {
  label: string;
  target: number;
  suffix?: string;
  prefix?: string;
}

export interface HomepageStats {
  annual_bookings: number;
  elite_yachts: number;
  recurring_clients_percent: number;
  global_awards: number;
}

// ─── Hero Slide ───────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: number;
  heading: string;
  subheading: string;
  cta_text: string;
  cta_link: string;
  image: WPImage | false;
}

// ─── Site Settings (WordPress Options / ACF Options Page) ────────────────────

export interface SiteSettings {
  brand_name: string;
  tagline: string;
  whatsapp_number: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  contact_email: string;
  contact_phone: string;
  hero_slides: HeroSlide[];
  stats: HomepageStats;
  footer_description: string;
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
