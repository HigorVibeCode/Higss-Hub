import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ProductDetail } from '@/components/ProductDetail';
import catalogData from '@/content/catalog.json';

export async function generateStaticParams({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const catalog = catalogData[locale as keyof typeof catalogData] || catalogData.en;
  return catalog.items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
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
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
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
