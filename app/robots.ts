import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://higsshub.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
