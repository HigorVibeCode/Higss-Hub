import { notFound } from 'next/navigation';
import { clientSlugFromHost } from '@/lib/domain';
import { env } from '@/lib/env';
import { readHub, storageMode } from '@/lib/store';

/** Web app manifest per client, so "Install" saves the page as an app named after them. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = storageMode ? (await readHub()).clients.find((c) => c.slug === slug) : undefined;
  if (!client) notFound();

  const onSubdomain = clientSlugFromHost(request.headers.get('host'), env.rootDomain) === slug;
  const start = onSubdomain ? '/' : `/c/${slug}`;
  return Response.json(
    {
      name: `${client.name} · Higss Hub`,
      short_name: client.name,
      start_url: start,
      scope: start,
      display: 'standalone',
      background_color: '#071316',
      theme_color: client.accent_color ?? '#071316',
      icons: [
        { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
      ],
    },
    { headers: { 'content-type': 'application/manifest+json' } },
  );
}
