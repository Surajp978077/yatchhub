/**
 * Base API client for the headless WordPress REST API.
 * All requests go through this module, making it trivial to swap
 * the HTTP layer (e.g. swap fetch for axios) in one place.
 */

const WP_BASE_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  'https://your-wordpress-site.com/wp-json';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface FetchOptions extends RequestInit {
  /** Next.js cache revalidation in seconds (ISR). Default: 60 s */
  revalidate?: number;
}

export async function wpFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate = 60, ...fetchOptions } = options;

  const url = `${WP_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...fetchOptions,
    next: { revalidate },
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, `WordPress API error: ${res.status} on ${url}`);
  }

  return res.json() as Promise<T>;
}

/** Build query string from an object, filtering out nullish values. */
export function buildQuery(params: Record<string, string | number | boolean | undefined | null>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== '',
  );
  if (!entries.length) return '';
  return '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString();
}
