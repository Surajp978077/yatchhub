/**
 * Yacht-specific API calls.
 *
 * WordPress setup required:
 *  - Custom Post Type: "yachts" (registered via functions.php or a CPT plugin)
 *  - ACF field group attached to the "yachts" CPT with: gallery, youtube_link,
 *    pricing, specifications, activities, short_description, featured_image
 *  - REST API exposure: add_filter('acf/rest_api/...' ) or use ACF to REST API plugin
 */

import { buildQuery, wpFetch } from './api';
import type { Yacht, WPPost, YachtACF } from '@/types';

const WP2 = '/wp/v2';

// ─── Normaliser ───────────────────────────────────────────────────────────────
function normaliseYacht(raw: WPPost<YachtACF>): Yacht {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title.rendered,
    content: raw.content.rendered,
    date: raw.date,
    acf: {
      gallery: raw.acf?.gallery ?? [],
      youtube_link: raw.acf?.youtube_link ?? '',
      pricing: raw.acf?.pricing ?? {},
      specifications: raw.acf?.specifications ?? {},
      activities: raw.acf?.activities ?? [],
      short_description: raw.acf?.short_description ?? '',
      featured_image: raw.acf?.featured_image ?? {
        id: 0,
        url: '/images/placeholder-yacht.jpg',
        alt: 'Yacht image',
      },
    },
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface GetYachtsParams {
  page?: number;
  perPage?: number;
  search?: string;
}

/** Fetch paginated yacht list */
export async function getYachts(params: GetYachtsParams = {}): Promise<Yacht[]> {
  try {
    const query = buildQuery({
      per_page: params.perPage ?? 12,
      page: params.page ?? 1,
      search: params.search,
      _fields: 'id,slug,title,content,date,acf',
    });

    const raw = await wpFetch<WPPost<YachtACF>[]>(`${WP2}/yachts${query}`, {
      revalidate: 300,
    });

    return raw.map(normaliseYacht);
  } catch {
    // WordPress not yet connected – return empty list so the page still renders.
    return [];
  }
}

/** Fetch a single yacht by slug */
export async function getYachtBySlug(slug: string): Promise<Yacht | null> {
  try {
    const query = buildQuery({ slug, _fields: 'id,slug,title,content,date,acf' });
    const raw = await wpFetch<WPPost<YachtACF>[]>(`${WP2}/yachts${query}`, {
      revalidate: 300,
    });

    if (!raw.length) return null;
    return normaliseYacht(raw[0]);
  } catch {
    return null;
  }
}

/** Fetch all yacht slugs (used for generateStaticParams) */
export async function getAllYachtSlugs(): Promise<string[]> {
  try {
    const query = buildQuery({ per_page: 100, _fields: 'slug' });
    const raw = await wpFetch<Array<{ slug: string }>>(`${WP2}/yachts${query}`, {
      revalidate: 3600,
    });
    return raw.map((r) => r.slug);
  } catch {
    // WordPress not yet connected – return empty array so build succeeds.
    // Pages will be generated on-demand via ISR.
    return [];
  }
}
