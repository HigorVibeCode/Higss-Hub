import { unstable_cache } from 'next/cache';

/** What WhatsApp-style link previews show: the page's share image, icon and description. */
export type Preview = { image: string | null; icon: string | null; description: string | null };

export const PREVIEW_TAG = 'previews';
const EMPTY: Preview = { image: null, icon: null, description: null };

function decode(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function attr(tag: string, name: string) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function absolute(href: string | null, base: string) {
  if (!href) return null;
  try {
    const url = new URL(href, base);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export function parsePreview(html: string, pageUrl: string): Preview {
  const head = html.slice(0, 200_000);
  const meta = new Map<string, string>();
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const key = (attr(tag, 'property') ?? attr(tag, 'name'))?.toLowerCase();
    const content = attr(tag, 'content');
    if (key && content && !meta.has(key)) meta.set(key, content);
  }

  // Prefer big icons: apple-touch-icon, then the largest declared icon, then any icon.
  let icon: string | null = null;
  let best = -1;
  for (const tag of head.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = attr(tag, 'rel')?.toLowerCase() ?? '';
    if (!rel.split(/\s+/).some((r) => r === 'icon' || r === 'apple-touch-icon')) continue;
    const size = rel.includes('apple-touch-icon') ? 180 : Number(attr(tag, 'sizes')?.split('x')[0]) || (attr(tag, 'type')?.includes('svg') ? 120 : 16);
    if (size > best) {
      best = size;
      icon = attr(tag, 'href');
    }
  }

  return {
    image: absolute(meta.get('og:image:secure_url') ?? meta.get('og:image') ?? meta.get('twitter:image') ?? null, pageUrl),
    icon: absolute(icon, pageUrl),
    description: meta.get('og:description') ?? meta.get('description') ?? null,
  };
}

async function fetchPreview(url: string): Promise<Preview> {
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; HigssHubBot/1.0; +https://higsshub.com)', accept: 'text/html' },
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('html')) return EMPTY;
    return parsePreview(await res.text(), res.url || url);
  } catch {
    return EMPTY;
  }
}

/** Cached for a day per URL; the panel's "Atualizar miniaturas" expires them all. */
export function getPreview(url: string) {
  return unstable_cache(() => fetchPreview(url), ['preview', url], { revalidate: 60 * 60 * 24, tags: [PREVIEW_TAG] })();
}
