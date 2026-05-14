/**
 * WordPress REST API helper utilities.
 *
 * These functions help transform raw WordPress API responses
 * into clean application-layer models.
 */

/**
 * Strip HTML tags from a WordPress rendered string.
 * Useful when only plain text is needed from rich-text fields.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();
}

/**
 * WordPress renders post titles with HTML entities.
 * Use this to decode them for display.
 */
export function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&hellip;/g, '…');
}

/**
 * Build a WordPress media URL with optional size.
 * Sizes: thumbnail, medium, medium_large, large, full
 */
export function getWpImageUrl(
  mediaDetails: {
    sizes?: Record<string, { source_url: string }>;
    source_url?: string;
  },
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large',
): string {
  return (
    mediaDetails?.sizes?.[size]?.source_url ??
    mediaDetails?.source_url ??
    '/images/placeholder-yacht.jpg'
  );
}

/**
 * Determine whether the WordPress REST API is reachable.
 * Useful for health-checks and graceful degradation.
 */
export async function pingWordPress(): Promise<boolean> {
  const baseUrl =
    process.env.NEXT_PUBLIC_WP_API_URL ?? 'https://your-wordpress-site.com/wp-json';
  try {
    const res = await fetch(`${baseUrl}/wp/v2/types`, {
      method: 'HEAD',
      next: { revalidate: 0 },
    });
    return res.ok;
  } catch {
    return false;
  }
}
