'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const handleOnSiteVisit = () => {
    const message = encodeURIComponent(t('onsiteVisit.cta'));
    const phone = '41782439213';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-surface border-t border-border/50">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <div className="mb-4">
                <Logo withoutLink={false} />
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                {t('tagline')}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text mb-6 uppercase tracking-wider">
                {t('quickLinks')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={`/${locale}`}
                    className="text-muted hover:text-accent text-sm transition-colors inline-block"
                  >
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/products-services`}
                    className="text-muted hover:text-accent text-sm transition-colors inline-block"
                  >
                    {t('products')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/smart-lab`}
                    className="text-muted hover:text-accent text-sm transition-colors inline-block"
                  >
                    {t('smartLab')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-muted hover:text-accent text-sm transition-colors inline-block"
                  >
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-text mb-6 uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-muted mb-6">
                <li>Interlaken, Switzerland</li>
                <li>
                  <a
                    href="mailto:contact@higsshub.com"
                    className="hover:text-accent transition-colors"
                  >
                    contact@higsshub.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+41782439213"
                    className="hover:text-accent transition-colors"
                  >
                    +41 78 243 9213
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/41782439213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    WhatsApp
                    <WhatsAppIcon size={16} className="shrink-0" />
                  </a>
                </li>
              </ul>
              
              {/* CTA On-site Visit */}
              <Button
                onClick={handleOnSiteVisit}
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                {t('onsiteVisit.cta')}
              </Button>
            </div>
          </div>

          <Divider className="my-8" />

          <div className="text-center text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} HIGSS HUB. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
