import { wpFetch } from './api';
import { toYachtCard, toYachtDetail } from '@/utils/transformers';
import type { Yacht, YachtCard, YachtDetail, PaginatedResponse } from '@/types';

const PER_PAGE = 12;

// ─── Fetch All Yachts (paginated) ─────────────────────────────────────────────

export async function getYachts(page = 1, perPage = PER_PAGE): Promise<PaginatedResponse<YachtCard>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json'}/wp/v2/yachts?page=${page}&per_page=${perPage}&_embed=true`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) throw new Error(`Failed to fetch yachts: ${res.status}`);

    const total = Number(res.headers.get('X-WP-Total') || '0');
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || '1');
    const raw: Yacht[] = await res.json();

    return {
      items: raw.map(toYachtCard),
      total,
      totalPages,
      currentPage: page,
    };
  } catch {
    return { items: [], total: 0, totalPages: 1, currentPage: page };
  }
}

// ─── Fetch Single Yacht by Slug ───────────────────────────────────────────────

export async function getYachtBySlug(slug: string): Promise<YachtDetail | null> {
  try {
    const raw = await wpFetch<Yacht[]>('/yachts', {
      slug,
      _embed: true,
    });

    if (!raw.length) return null;
    return toYachtDetail(raw[0]);
  } catch {
    return null;
  }
}

// ─── Fetch All Slugs (for generateStaticParams) ───────────────────────────────

export async function getAllYachtSlugs(): Promise<string[]> {
  try {
    const raw = await wpFetch<Pick<Yacht, 'slug'>[]>('/yachts', {
      per_page: 100,
      fields: 'slug',
    });
    return raw.map((y) => y.slug);
  } catch {
    return [];
  }
}

// ─── Featured Yachts (homepage preview) ──────────────────────────────────────

export async function getFeaturedYachts(count = 6): Promise<YachtCard[]> {
  const result = await getYachts(1, count);
  return result.items;
}
