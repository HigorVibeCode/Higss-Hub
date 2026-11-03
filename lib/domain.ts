export const SLUG_RE = /^[a-z0-9]([a-z0-9-]{0,38}[a-z0-9])?$/;

const RESERVED = new Set(['www', 'admin', 'app', 'api']);

/** Returns the client slug when the host is <slug>.<rootDomain> (or <slug>.localhost in dev). */
export function clientSlugFromHost(host: string | null, rootDomain: string): string | null {
  if (!host) return null;
  const hostname = host.split(':')[0].toLowerCase();
  let sub: string | null = null;
  if (hostname.endsWith(`.${rootDomain}`)) sub = hostname.slice(0, -(rootDomain.length + 1));
  else if (hostname.endsWith('.localhost')) sub = hostname.slice(0, -'.localhost'.length);
  if (!sub || RESERVED.has(sub) || !SLUG_RE.test(sub)) return null;
  return sub;
}

export function clientUrl(slug: string, rootDomain: string) {
  return `https://${slug}.${rootDomain}`;
}
