'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';

const icons = {
  people: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  products: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  processes: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
};

export function HowIWork() {
  const t = useTranslations('home.howIWork');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const items = ['people', 'products', 'processes'];

  return (
    <Section variant="surface">
      <Container>
        <div ref={sectionRef}>
          <SectionHeader
            title={t('title')}
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto relative">
            {/* Linha conectora animada */}
            {!isMobile && (
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 pointer-events-none z-0">
                <div 
                  className="h-full bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-all duration-1000"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
              </div>
            )}

            {items.map((item, index) => (
              <div key={item} className="relative z-10 flex">
                <Card 
                  className="group relative overflow-hidden flex flex-col w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Overlay tipo blueprint/interface sutil no hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(216, 116, 69, 0.05) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      animation: hoveredIndex === index ? 'scan 2s linear infinite' : 'none',
                    }}
                  />
                  
                  <div className="relative z-10 flex flex-col flex-1">
                    <div className="text-accent mb-6 group-hover:text-accentHover transition-colors relative flex-shrink-0">
                      {icons[item as keyof typeof icons]}
                      {/* Micro-animação de fluxo/sync */}
                      <div 
                        className="absolute -top-2 -right-2 w-3 h-3 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          animation: hoveredIndex === index ? 'pulse 2s ease-in-out infinite' : 'none',
                        }}
                      />
                    </div>
                    <h3 className="text-xl md:text-2xl font-manrope font-bold text-text mb-4 flex-shrink-0">
                      {t(`${item}.title`)}
                    </h3>
                    <p className="text-muted leading-relaxed text-sm md:text-base flex-1">
                      {t(`${item}.description`)}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes scan {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </Section>
  );
}
