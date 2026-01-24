import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetail } from '@/components/ProductDetail';
import catalogData from '@/content/catalog.json';

export async function generateStaticParams({
  params
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const { locale } = await Promise.resolve(params);
  const catalog = catalogData[locale as keyof typeof catalogData] || catalogData.en;
  return catalog.items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = await Promise.resolve(params);
  const catalog = catalogData[locale as keyof typeof catalogData] || catalogData.en;
  const item = catalog.items.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${item.title} - HIGSS HUB`,
    description: item.shortDescription,
    openGraph: {
      title: item.title,
      description: item.shortDescription,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}) {
  const { locale, slug } = await Promise.resolve(params);
  const catalog = catalogData[locale as keyof typeof catalogData] || catalogData.en;
  const item = catalog.items.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="pt-20">
      <ProductDetail item={item} locale={locale} />
    </div>
  );
}
