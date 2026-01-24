import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SmartLabTimeline } from '@/components/SmartLabTimeline';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'smartLab' });

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

export default function SmartLabPage() {
  return (
    <div className="pt-20">
      <SmartLabTimeline />
    </div>
  );
}
