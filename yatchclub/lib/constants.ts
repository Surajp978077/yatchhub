export const WORDPRESS_API_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json';

export const WP_API_BASE = `${WORDPRESS_API_URL}/wp/v2`;
export const ACF_API_BASE = `${WORDPRESS_API_URL}/acf/v3`;

export const REVALIDATE_SECONDS = 60; // ISR: revalidate every 60 seconds

export const SITE_NAME = 'AQUAVISTA';
export const SITE_TAGLINE = 'Luxury Yacht Charters';
export const DEFAULT_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/yachts' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

export const FALLBACK_IMAGE = '/images/placeholder-yacht.jpg';

export const HERO_SLIDES_FALLBACK = [
  {
    id: 1,
    heading: 'Sail Into Luxury',
    subheading:
      'Experience the world\'s most breathtaking destinations on our exclusive superyachts.',
    cta_text: 'Explore Fleet',
    cta_link: '/yachts',
    image: false as const,
  },
  {
    id: 2,
    heading: 'Unmatched Elegance',
    subheading:
      'Discover the finest maritime engineering combined with ultra-premium hospitality.',
    cta_text: 'View Designs',
    cta_link: '/yachts',
    image: false as const,
  },
];

export const STATS_FALLBACK = [
  { label: 'Annual Bookings', target: 150, suffix: '+' },
  { label: 'Elite Yachts', target: 45, suffix: '+' },
  { label: 'Recurring Clients', target: 85, suffix: '%' },
  { label: 'Global Awards', target: 12, suffix: '' },
];
