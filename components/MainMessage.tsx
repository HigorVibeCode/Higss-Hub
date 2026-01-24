import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export function MainMessage() {
  const t = useTranslations('home.mainMessage');

  return (
    <Section variant="surface">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Label discreto opcional */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider text-muted font-medium">
              Core Thesis
            </span>
          </div>

          <div className="space-y-8">
            {/* Lead paragraph */}
            <p className="text-xl md:text-2xl text-text leading-relaxed font-light">
              {t('paragraph1')}
            </p>

            {/* Corpo do texto */}
            <div className="space-y-6 text-lg text-text/90 leading-relaxed">
              <p>
                {t('paragraph2')}
              </p>
              <p>
                {t('paragraph3')}
              </p>
              <p>
                {t('paragraph4')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
