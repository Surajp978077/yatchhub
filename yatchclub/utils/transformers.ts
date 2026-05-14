import type {
  Yacht,
  YachtCard,
  YachtDetail,
  Testimonial,
  TestimonialItem,
  WPImage,
  YachtSpecification,
} from '@/types';
import { FALLBACK_IMAGE } from '@/lib/constants';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFeaturedImageUrl(post: Yacht): string {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  if (post.acf?.featured_image && typeof post.acf.featured_image !== 'boolean') {
    return (post.acf.featured_image as WPImage).url;
  }
  return FALLBACK_IMAGE;
}

function getFeaturedImageAlt(post: Yacht): string {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.alt_text) {
    return post._embedded['wp:featuredmedia'][0].alt_text;
  }
  if (post.acf?.featured_image && typeof post.acf.featured_image !== 'boolean') {
    return (post.acf.featured_image as WPImage).alt;
  }
  return post.title.rendered;
}

function parseSpecifications(raw: unknown): YachtSpecification[] {
  if (Array.isArray(raw)) return raw as YachtSpecification[];
  if (typeof raw === 'string' && raw.trim()) {
    // Fallback: parse "Label: Value" newline-separated string
    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [label, ...rest] = line.split(':');
        return { label: label.trim(), value: rest.join(':').trim() };
      });
  }
  return [];
}

function parseActivities(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === 'string' && raw.trim()) {
    return raw.split('\n').filter(Boolean).map((s) => s.trim());
  }
  return [];
}

function parseGallery(raw: unknown): WPImage[] {
  if (!raw || raw === false) return [];
  if (Array.isArray(raw)) return raw as WPImage[];
  return [];
}

function decodeHtml(html: string): string {
  return html.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
}

// ─── Yacht Transformers ───────────────────────────────────────────────────────

export function toYachtCard(raw: Yacht): YachtCard {
  return {
    id: raw.id,
    slug: raw.slug,
    title: decodeHtml(raw.title.rendered),
    shortDescription: raw.acf?.short_description || raw.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    pricing: raw.acf?.pricing || 'Contact for pricing',
    featuredImage: getFeaturedImageUrl(raw),
    featuredImageAlt: getFeaturedImageAlt(raw),
    length: raw.acf?.length,
    guests: raw.acf?.guests,
  };
}

export function toYachtDetail(raw: Yacht): YachtDetail {
  return {
    ...toYachtCard(raw),
    content: raw.content.rendered,
    gallery: parseGallery(raw.acf?.gallery),
    youtubeLink: raw.acf?.youtube_link || '',
    specifications: parseSpecifications(raw.acf?.specifications),
    activities: parseActivities(raw.acf?.activities),
    crew: raw.acf?.crew,
    yearBuilt: raw.acf?.year_built,
  };
}

// ─── Testimonial Transformers ─────────────────────────────────────────────────

export function toTestimonialItem(raw: Testimonial): TestimonialItem {
  return {
    id: raw.id,
    quote: raw.acf?.quote || raw.content.rendered.replace(/<[^>]*>/g, '').trim(),
    reviewerName: raw.acf?.reviewer_name || raw.title.rendered,
    reviewerTitle: raw.acf?.reviewer_title || '',
    reviewerCompany: raw.acf?.reviewer_company,
    avatarUrl:
      raw.acf?.avatar && typeof raw.acf.avatar !== 'boolean'
        ? (raw.acf.avatar as WPImage).url
        : undefined,
    rating: raw.acf?.rating ?? 5,
  };
}
