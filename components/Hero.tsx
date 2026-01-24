'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const headline = t('headline');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax baseado em scroll para mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax baseado em mouse para desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = ((clientX / innerWidth) * 2 - 1) * 12;
      const y = ((clientY / innerHeight) * 2 - 1) * 12;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Formatar headline baseado em palavras-chave para funcionar em todos os idiomas
  // Palavras equivalentes a "BIG" e "RESULTS" são laranja
  // Palavras equivalentes a "for/para/pour/für/per" são serif itálico menor
  // Demais palavras são brancas bold uppercase
  const words = headline.split(/\s+/);
  
  // Palavras-chave que devem ser laranja (equivalente a BIG e RESULTS)
  const accentWords = new Set([
    // BIG e equivalentes
    'BIG', 'GRANDES', 'GRAND', 'GRANDI', 'GROSSE', 'GRANDS',
    // RESULTS e equivalentes
    'RESULTS', 'RESULTADOS', 'RÉSULTATS', 'RISULTATI', 'ERGEBNISSE'
  ]);
  
  // Palavras-chave que devem ser serif itálico menor (equivalente a for)
  // Apenas preposições/conjunções pequenas
  const italicWords = new Set([
    'FOR', 'PARA', 'POUR', 'FÜR', 'PER'
  ]);
  
  const formattedHeadline = words.map((word, index) => {
    const upperWord = word.toUpperCase().trim();
    const isLast = index === words.length - 1;
    
    // Palavras que devem ser laranja (BIG, RESULTS e equivalentes)
    if (accentWords.has(upperWord)) {
      return (
        <span key={index} className="text-accent font-manrope font-bold uppercase">
          {upperWord}
          {!isLast && ' '}
        </span>
      );
    }
    // Palavras que devem ser serif itálico menor (for, para, pour, etc)
    if (italicWords.has(upperWord)) {
      return (
        <span key={index} className="text-text font-serif italic font-light text-3xl sm:text-4xl lg:text-5xl xl:text-6xl normal-case">
          {' '}{word.toLowerCase()}{' '}
        </span>
      );
    }
    // Demais palavras - brancas, bold, uppercase
    return (
      <span key={index} className="text-text font-manrope font-bold uppercase">
        {upperWord}
        {!isLast && ' '}
      </span>
    );
  });

  return (
    <section className="relative overflow-hidden min-h-screen flex items-start md:items-center pt-24 md:pt-16 pb-5 md:pb-0" style={{ marginTop: 0 }}>
      {/* Background image com parallax - full screen, sem bordas, cobre toda a viewport */}
      {/* A imagem fica atrás da navbar (z-index menor que 50) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center 30%' : 'center right', // Mobile: 30% do topo mostra o rosto, Desktop: mantém right
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // Parallax effect
          opacity: isMobile ? 0.5 : 0.4, // Mobile: um pouco mais visível
          transform: isMobile 
            ? `translateY(${scrollPosition * 0.3}px)` // Parallax sutil no mobile baseado em scroll
            : `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.15)`, // Desktop: parallax no mouse
          transition: isMobile ? 'transform 0.1s ease-out' : 'transform 0.1s ease-out',
          zIndex: 0,
          top: '-5rem', // Compensa o padding-top da section
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: 'calc(100% + 5rem)',
          minHeight: 'calc(100vh + 5rem)',
        }}
      />
      
      {/* Overlay gradiente escuro para legibilidade do texto - acima da imagem */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-bg/90 via-bg/75 to-bg/60 pointer-events-none" 
        style={{ 
          zIndex: 1,
          top: '-5rem',
          height: 'calc(100% + 5rem)',
          minHeight: 'calc(100vh + 5rem)',
        }} 
      />
      
      <Container className="relative z-10 pt-8 md:pt-0">
        <div className="max-w-4xl">
          <div className="space-y-6 md:space-y-8">
            {/* Eyebrow com linha laranja - serif itálico */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 md:w-12 h-0.5 bg-accent" />
              <p className="text-sm md:text-base text-muted font-serif italic not-uppercase tracking-normal">
                {t('subheadline')}
              </p>
            </div>
            
            <div className="space-y-5 md:space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-manrope text-text leading-[1.2] md:leading-[1.1] tracking-tight uppercase">
                {formattedHeadline}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-4 pt-6 md:pt-4">
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="text-base md:text-base min-h-[48px] md:min-h-[44px]"
              >
                {t('ctaPrimary')}
              </Button>
              <Button
                href={`/${locale}/products-services`}
                variant="secondary"
                size="lg"
                className="text-base md:text-base min-h-[48px] md:min-h-[44px]"
              >
                {t('ctaSecondary')}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Seta discreta piscando indicando scroll - apenas mobile */}
      {isMobile && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted/50 scroll-arrow"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </section>
  );
}
