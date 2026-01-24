import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { MainMessage } from '@/components/MainMessage';
import { Metrics } from '@/components/Metrics';
import { HowIWork } from '@/components/HowIWork';
import { CTA } from '@/components/CTA';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });

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
      <Metrics />
      <div className="section-divider" />
      <HowIWork />
      <div className="section-divider" />
      <CTA />
    </div>
  );
}
