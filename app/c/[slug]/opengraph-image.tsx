import { ImageResponse } from 'next/og';
import { ShareImage } from '@/components/ShareImage';
import { readHub, storageMode } from '@/lib/store';

export const alt = 'Higss Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = storageMode ? (await readHub()).clients.find((c) => c.slug === slug) : undefined;
  return new ImageResponse(
    <ShareImage eyebrow="Projects" title={client?.name ?? 'Higss Hub'} accent={client?.accent_color ?? undefined} />,
    size,
  );
}
