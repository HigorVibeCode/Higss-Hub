import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export function MainMessage() {
  const t = useTranslations('home.mainMessage');

  return (
    <Section variant="surface">
      <Container>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ícone multiplataforma - Imagem importada (flutuante) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="mb-6 md:mb-8 flex items-center floating-icon">
            <img
              src="/images/sessao.png"
              alt="Multi-platform icon"
              width={168}
              height={168}
              className="object-contain floating-icon"
              style={{
                filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
                display: 'block',
                margin: 0,
                padding: 0,
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          <div className="space-y-6 md:space-y-8">
            {/* Lead statement - destaque */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-text leading-tight md:leading-tight font-light tracking-tight">
              {t('lead')}
            </p>

            {/* Primeiro bloco - introdução */}
            <div className="space-y-4 md:space-y-5">
              <p className="text-lg md:text-xl text-text/95 leading-relaxed font-light">
                {t('paragraph1')}
              </p>
              <p className="text-lg md:text-xl text-text/95 leading-relaxed font-light italic">
                {t('paragraph2')}
              </p>
            </div>

            {/* Corpo principal do texto */}
            <div className="space-y-5 md:space-y-6 text-base md:text-lg text-text/90 leading-relaxed max-w-prose">
              <p>
                {t('paragraph3')}
              </p>
              <p>
                {t('paragraph4')}
              </p>
            </div>

            {/* Conclusão */}
            <div className="space-y-4 md:space-y-5 pt-2 md:pt-4">
              <p className="text-lg md:text-xl text-text/95 leading-relaxed font-light">
                {t('paragraph5')}
              </p>
              <p className="text-lg md:text-xl text-text/95 leading-relaxed font-light">
                {t('paragraph6')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
