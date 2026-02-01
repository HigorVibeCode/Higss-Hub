import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

const WHATSAPP_URL = 'https://wa.me/41782439213';

export function Metrics() {
  const t = useTranslations('home.metrics');

  return (
    <Section variant="surface" className="py-10 md:py-12">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="space-y-2 mb-6">
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {t('line1')}
            </p>
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {t('line2')}
            </p>
            <p className="text-xl md:text-2xl font-manrope font-bold text-text leading-tight pt-1">
              {t('line3')}
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-base bg-accent hover:bg-accentHover text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg min-h-[44px]"
          >
            {t('ctaButton')}
            <WhatsAppIcon size={20} className="shrink-0" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
