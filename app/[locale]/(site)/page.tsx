import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { MainMessage } from '@/components/MainMessage';
import { Metrics } from '@/components/Metrics';
import { HowIWork } from '@/components/HowIWork';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }> | { locale: string };
}): Promise<Metadata> {
  const { locale } = await Promise.resolve(params);
  setRequestLocale(locale);
  const t = await getTranslations({ namespace: 'home' });

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

export default function HomePage() {
  return (
    <div className="pt-20">
      <Hero />
      <div className="section-divider" />
      <MainMessage />
      <div className="section-divider" />
      <HowIWork />
      <div className="section-divider" />
      <Metrics />
    </div>
  );
}
