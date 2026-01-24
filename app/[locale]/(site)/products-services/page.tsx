import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Catalog } from '@/components/Catalog';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default function ProductsServicesPage() {
  return (
    <div className="pt-20">
      <Catalog />
    </div>
  );
}
