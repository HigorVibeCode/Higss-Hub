import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function CTA() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <Section>
      <Container>
        <Card className="text-center border-accent/50 bg-surface/50 max-w-3xl mx-auto" hover={false}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-manrope font-bold text-text mb-6 md:mb-8">
            {t('title')}
          </h2>
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="lg"
          >
            {t('button')}
          </Button>
        </Card>
      </Container>
    </Section>
  );
}
