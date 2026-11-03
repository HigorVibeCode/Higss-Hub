import { ImageResponse } from 'next/og';
import { ShareImage } from '@/components/ShareImage';

export const alt = 'Higss Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(<ShareImage eyebrow="Projects · Systems · Sites" title="All in one place" />, size);
}
