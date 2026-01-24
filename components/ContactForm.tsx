'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [whatsappPhone, setWhatsappPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const handleWhatsApp = () => {
    if (whatsappPhone) {
      const message = encodeURIComponent(t('whatsapp.defaultMessage'));
      window.open(`https://wa.me/${whatsappPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
    }
  };

  const handleOnSiteVisit = () => {
    const message = encodeURIComponent(t('onsiteVisit.message'));
    const phone = '41782439213';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <Section>
      <Container>
        {/* Header customizado para corresponder à imagem de referência */}
        <div className="max-w-4xl mx-auto mb-16 text-left">
          {/* Eyebrow - serif itálico */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-0.5 bg-text/50" />
            <p className="text-sm md:text-base text-muted font-serif italic">
              {t('eyebrow')}
            </p>
          </div>
          
          {/* Título - todo em itálico */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-manrope font-bold text-text leading-tight mb-8 italic">
            {t('titleItalic')} {t('titleNormal')}
          </h1>
          
          {/* Texto do corpo - serif, cinza claro */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Informações de contato premium */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-8">
              {t('info.title')}
            </h2>
            
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

            <Card hover={false} className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-text mb-1 text-sm uppercase tracking-wide">
                    {t('info.phone')}
                  </p>
                  <a
                    href="tel:+41782439213"
                    className="text-muted hover:text-accent transition-colors text-lg"
                  >
                    +41 78 243 9213
                  </a>
                </div>
              </div>
            </Card>

            <Card hover={false} className="p-6 border-accent/30 bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.867-.272 0-.42.149-.652.149-.232 0-.419-.149-.652-.149-.272 0-1.733.718-2.03.867-.297.149-.297.382 0 .531.297.149 1.758.867 2.03.867.272 0 .42-.149.652-.149.232 0 .419.149.652.149.272 0 1.733-.718 2.03-.867.297-.149.297-.382 0-.531zm-5.421-7.83a.885.885 0 00-.867.885c0 .488.396.885.885.885a.888.888 0 000-1.77zm4.729 0a.885.885 0 00-.867.885c0 .488.396.885.885.885a.888.888 0 000-1.77zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.736 15.214c-.149-.298-.867-1.758-.867-2.03 0-.272.149-.42.149-.652 0-.232-.149-.419-.149-.652 0-.272.718-1.733.867-2.03.149-.297.382-.297.531 0 .149.297.867 1.758.867 2.03 0 .272-.149.42-.149.652 0 .232.149.419.149.652 0 .272-.718 1.733-.867 2.03-.149.297-.382.297-.531 0z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text mb-1 text-sm uppercase tracking-wide">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/41782439213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-green-500 transition-colors text-lg inline-flex items-center gap-2"
                  >
                    +41 78 243 9213
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>

            {/* CTA On-site Visit */}
            <Card hover={true} className="p-6 border-accent/50 bg-surface/50">
              <h3 className="text-lg font-manrope font-bold text-text mb-2">
                {t('onsiteVisit.title')}
              </h3>
              <p className="text-muted text-sm mb-4">
                {t('onsiteVisit.description')}
              </p>
              <Button
                onClick={handleOnSiteVisit}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                {t('onsiteVisit.cta')}
              </Button>
            </Card>
          </div>

          {/* Formulário premium */}
          <div>
            <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-8">
              {t('form.title')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-card border border-border/50 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder={t('form.namePlaceholder')}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-card border border-border/50 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder={t('form.emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-text mb-2">
                  {t('form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 bg-card border border-border/50 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder={t('form.companyPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3.5 bg-card border border-border/50 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                  placeholder={t('form.messagePlaceholder')}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
              >
                {t('form.submit')}
              </Button>
            </form>

            <Divider className="my-8" />

            {/* WhatsApp */}
            <div>
              <h3 className="text-xl font-manrope font-bold text-text mb-4">
                {t('whatsapp.title')}
              </h3>
              <div className="flex gap-3">
                <input
                  type="tel"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder={t('whatsapp.phonePlaceholder')}
                  className="flex-1 px-4 py-3.5 bg-card border border-border/50 rounded-lg text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
                <Button
                  onClick={handleWhatsApp}
                  disabled={!whatsappPhone}
                  variant="primary"
                  className="bg-green-600 hover:bg-green-700 border-green-600"
                >
                  {t('whatsapp.send')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
