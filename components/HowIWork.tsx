'use client';

import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';

const icons = {
  people: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  processes: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25a2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  products: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const categories = ['people', 'processes', 'products'] as const;

export function HowIWork() {
  const t = useTranslations('home.howIWork');

  return (
    <Section variant="default">
      <Container>
        <SectionHeader title={t('title')} className="mb-4" />
        <p className="text-base md:text-lg text-muted text-center max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed">
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Card key={category} className="flex flex-col h-full">
              {/* Header: Icon in container + Label */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {icons[category]}
                </div>
                <h3 className="text-xs font-manrope font-bold text-text uppercase tracking-[0.2em]">
                  {t(`${category}.label`)}
                </h3>
              </div>

              {/* Pain points — scannable list */}
              <ul className="space-y-3.5 mb-6 flex-1 min-h-0" role="list">
                <li className="flex gap-3 text-muted text-sm md:text-[15px] leading-[1.6]">
                  <span className="text-accent/60 mt-1.5 flex-shrink-0 text-lg leading-none">•</span>
                  <span>{t(`${category}.pain1`)}</span>
                </li>
                <li className="flex gap-3 text-muted text-sm md:text-[15px] leading-[1.6]">
                  <span className="text-accent/60 mt-1.5 flex-shrink-0 text-lg leading-none">•</span>
                  <span>{t(`${category}.pain2`)}</span>
                </li>
                <li className="flex gap-3 text-muted text-sm md:text-[15px] leading-[1.6]">
                  <span className="text-accent/60 mt-1.5 flex-shrink-0 text-lg leading-none">•</span>
                  <span>{t(`${category}.pain3`)}</span>
                </li>
              </ul>

              {/* Purpose — visual emphasis */}
              <div className="pt-5 border-t border-border/60">
                <p className="text-text/90 text-sm md:text-[15px] font-medium leading-[1.6] italic">
                  {t(`${category}.purpose`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
