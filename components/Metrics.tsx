import { useTranslations, useLocale } from 'next-intl';
import metricsData from '@/content/metrics.json';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';

export function Metrics() {
  const t = useTranslations('home.metrics');
  const locale = useLocale();
  const metrics = metricsData[locale as keyof typeof metricsData] || metricsData.en;

  return (
    <Section>
      <Container>
        <SectionHeader
          title={t('title')}
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-manrope font-bold text-accent mb-3">
                {metric.value || '—'}
              </div>
              <div className="text-muted text-sm uppercase tracking-wider font-medium">
                {metric.label}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
