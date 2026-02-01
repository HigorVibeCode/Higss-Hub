'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function ContactForm() {
  const t = useTranslations('contact');

  const handleOnSiteVisit = () => {
    const message = encodeURIComponent(t('onsiteVisit.message'));
    const phone = '41782439213';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    window.open(`https://wa.me/41782439213?text=${message}`, '_blank');
  };

  return (
    <Section variant="surface">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-16 text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-text/50" />
            <p className="text-sm md:text-base text-muted font-serif italic">
              {t('eyebrow')}
            </p>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-manrope font-bold text-text leading-tight mb-8 italic">
            {t('titleItalic')} {t('titleNormal')}
          </h1>
          
          <div className="space-y-4 text-lg md:text-xl text-muted font-serif leading-relaxed max-w-3xl">
            <p>{t('bodyText.paragraph1')}</p>
            <p>
              {t('bodyText.paragraph2')}{' '}
              <span className="italic">{t('bodyText.clarity')}</span>.
              {' '}{t('bodyText.paragraph2Cont')}
            </p>
            <p>{t('bodyText.paragraph3')}</p>
          </div>
        </div>

        {/* Seção de contatos - layout limpo e organizado */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-8">
            {t('info.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Localização */}
            <Card hover={false} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text mb-1 text-sm uppercase tracking-wide">
                    {t('info.location')}
                  </p>
                  <p className="text-muted text-lg">Interlaken, Switzerland</p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card hover={false} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text mb-1 text-sm uppercase tracking-wide">
                    {t('info.email')}
                  </p>
                  <a
                    href="mailto:contact@higsshub.com"
                    className="text-muted hover:text-accent transition-colors text-lg inline-flex items-center gap-2 group"
                  >
                    contact@higsshub.com
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>

            {/* Telefone e WhatsApp unificado */}
            <Card hover={false} className="p-6 md:col-span-2 border-accent/30 bg-accent/5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <WhatsAppIcon size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-text mb-1 text-sm uppercase tracking-wide">
                      {t('info.phoneWhatsApp')}
                    </p>
                    <p className="text-muted text-lg mb-2">+41 78 243 9213</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:+41782439213"
                        className="text-accent hover:text-accentHover transition-colors text-sm font-medium inline-flex items-center gap-2"
                        aria-label={t('info.call')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {t('info.call')}
                      </a>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="text-accent hover:text-accentHover transition-colors text-sm font-medium inline-flex items-center gap-2"
                      >
                        <WhatsAppIcon size={16} className="shrink-0" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsApp}
                  variant="primary"
                  size="md"
                  className="self-start sm:self-center shrink-0"
                >
                  {t('info.callWhatsApp')}
                </Button>
              </div>
            </Card>

            {/* CTA Visitas Presenciais */}
            <Card hover={true} className="p-6 md:col-span-2 border-accent/50 bg-surface/50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-manrope font-bold text-text mb-2">
                    {t('onsiteVisit.title')}
                  </h3>
                  <p className="text-muted text-sm">
                    {t('onsiteVisit.description')}
                  </p>
                </div>
                <Button
                  onClick={handleOnSiteVisit}
                  variant="secondary"
                  size="md"
                  className="shrink-0"
                >
                  {t('onsiteVisit.cta')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
