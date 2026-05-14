import axios, { AxiosError } from 'axios';
import { WP_API_BASE, ACF_API_BASE, REVALIDATE_SECONDS } from '@/lib/constants';

// ─── Axios Instance ───────────────────────────────────────────────────────────

export const wpAxios = axios.create({
  baseURL: WP_API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Generic Fetch (Next.js Server-Side with ISR) ─────────────────────────────

export async function wpFetch<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  revalidate: number = REVALIDATE_SECONDS
): Promise<T> {
  const url = new URL(`${WP_API_BASE}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url.toString()}`);
  }

  return res.json() as Promise<T>;
}

export async function acfFetch<T>(
  endpoint: string,
  revalidate: number = REVALIDATE_SECONDS
): Promise<T> {
  const res = await fetch(`${ACF_API_BASE}${endpoint}`, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`ACF API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ─── Error Handler ────────────────────────────────────────────────────────────

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) return error.message;
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
}
