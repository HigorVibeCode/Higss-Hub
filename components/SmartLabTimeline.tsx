'use client';

import { useTranslations, useLocale } from 'next-intl';
import smartLabData from '@/content/smartlab.json';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function SmartLabTimeline() {
  const t = useTranslations('smartLab');
  const locale = useLocale();

  const data = smartLabData[locale as keyof typeof smartLabData] || smartLabData.en;

  return (
    <Section>
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('description')}
          className="mb-16"
        />

        {/* Timeline vertical premium - SEM FILTROS */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 via-border to-transparent" />
            
            <div className="space-y-16">
              {data.items.map((item, index) => (
                <div key={index} className="relative pl-20 md:pl-28">
                  {/* Marcador */}
                  <div className="absolute left-4 md:left-8 w-8 h-8 bg-accent rounded-full border-4 border-bg shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-text rounded-full" />
                  </div>
                  
                  <Card className="hover:border-accent/70">
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <span className="text-xs font-bold text-accent uppercase tracking-widest">
                        {item.phase || item.year}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-4 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-lg text-muted mb-6 leading-relaxed">
                      {item.insight}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex}>{tag}</Badge>
                      ))}
                    </div>
                    
                    {item.howIApplyIt && (
                      <div className="mt-6 pt-6 border-t border-border/50">
                        <h4 className="text-sm font-semibold text-text mb-3 uppercase tracking-wide">
                          {t('howIApplyIt')}
                        </h4>
                        <p className="text-muted leading-relaxed">
                          {item.howIApplyIt}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
