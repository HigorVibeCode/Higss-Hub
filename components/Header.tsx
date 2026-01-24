'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { locales, type Locale } from '@/i18n';
import { Logo } from '@/components/Logo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const buttonRefDesktop = useRef<HTMLButtonElement>(null);
  const buttonRefMobile = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Verifica se o clique foi dentro do menu de idiomas ou no botão
      const clickedInsideLanguageMenu = 
        languageMenuRef.current?.contains(target) ||
        buttonRefDesktop.current?.contains(target) ||
        buttonRefMobile.current?.contains(target);
      
      // Fechar menu de idiomas apenas se clicou fora
      // Usa um pequeno delay para garantir que o onClick do botão seja processado primeiro
      if (isLanguageMenuOpen && !clickedInsideLanguageMenu) {
        setTimeout(() => {
          setIsLanguageMenuOpen(false);
        }, 100);
      }
      
      // Fechar menu mobile
      const clickedInsideMobileMenu = 
        mobileMenuRef.current?.contains(target) ||
        mobileMenuButtonRef.current?.contains(target);
      
      if (isMobileMenuOpen && !clickedInsideMobileMenu) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isLanguageMenuOpen) {
          setIsLanguageMenuOpen(false);
          buttonRefDesktop.current?.focus();
          buttonRefMobile.current?.focus();
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          mobileMenuButtonRef.current?.focus();
        }
      }
    };

    if (isLanguageMenuOpen || isMobileMenuOpen) {
      // Usa 'click' ao invés de 'mousedown' para evitar conflitos
      // Adiciona um pequeno delay para garantir que o onClick do botão seja processado primeiro
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
      }, 0);
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('keydown', handleEscape);
      };
    }
    
    return () => {};
  }, [isLanguageMenuOpen, isMobileMenuOpen]);

  const isActive = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    return pathWithoutLocale === path;
  };

  const switchLocale = (newLocale: Locale) => {
    // Se já está no locale selecionado, apenas fecha o menu
    if (newLocale === locale) {
      setIsLanguageMenuOpen(false);
      return;
    }
    
    // Fecha os menus
    setIsLanguageMenuOpen(false);
    setIsMobileMenuOpen(false);
    
    // Usa window.location.pathname para obter o pathname completo da URL atual
    // Isso garante que temos o pathname real incluindo o locale
    const currentPath = window.location.pathname;
    
    // Remove o locale atual do início do pathname
    // Exemplos de input:
    // /en -> output: /
    // /en/ -> output: /
    // /en/products-services -> output: /products-services
    // /pt/contact -> output: /contact
    // /pt/products-services/slug -> output: /products-services/slug
    
    let pathWithoutLocale = currentPath;
    const localePattern = `/${locale}`;
    
    // Remove o locale do início do path
    if (pathWithoutLocale.startsWith(localePattern)) {
      pathWithoutLocale = pathWithoutLocale.substring(localePattern.length);
    }
    
    // Normaliza o path
    // Se ficou vazio ou só tem barra, é a home
    if (!pathWithoutLocale || pathWithoutLocale === '' || pathWithoutLocale === '/') {
      pathWithoutLocale = '';
    } else {
      // Garante que comece com /
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale;
      }
      // Remove barra final se não for home
      if (pathWithoutLocale.endsWith('/') && pathWithoutLocale.length > 1) {
        pathWithoutLocale = pathWithoutLocale.slice(0, -1);
      }
    }
    
    // Constrói a nova URL
    // Se for home, apenas /locale, senão /locale/path
    const newUrl = pathWithoutLocale === '' 
      ? `/${newLocale}` 
      : `/${newLocale}${pathWithoutLocale}`;
    
    // Debug (pode remover depois)
    console.log('[Locale Switch Debug]', {
      currentLocale: locale,
      newLocale,
      currentPath,
      pathWithoutLocale,
      newUrl
    });
    
    // Força navegação completa - necessário para o middleware processar
    // Usa window.location.href para garantir reload completo e re-processamento do middleware
    // Isso é essencial para o next-intl funcionar corretamente
    try {
      window.location.href = newUrl;
    } catch (error) {
      console.error('[Locale Switch Error]', error);
      // Fallback: tenta usar replace
      window.location.replace(newUrl);
    }
  };

  const handleLanguageButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsLanguageMenuOpen(!isLanguageMenuOpen);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg border-b border-border/50' : 'bg-transparent backdrop-blur-none'
      }`}
      style={{
        backgroundColor: scrolled ? undefined : 'transparent',
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className={`text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/products-services`}
              className={`text-sm font-medium transition-colors ${
                isActive('/products-services')
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t('products')}
            </Link>
            <Link
              href={`/${locale}/smart-lab`}
              className={`text-sm font-medium transition-colors ${
                isActive('/smart-lab')
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t('smartLab')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className={`text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t('contact')}
            </Link>

            <div className="relative ml-4 pl-4 border-l border-border">
              <button
                ref={buttonRefDesktop}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('[Desktop] Toggle language menu, current state:', isLanguageMenuOpen);
                  setIsLanguageMenuOpen(!isLanguageMenuOpen);
                }}
                onKeyDown={handleLanguageButtonKeyDown}
                aria-label="Select language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
                className="p-2 text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded"
                style={{ pointerEvents: 'auto' }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div
                  ref={languageMenuRef}
                  className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg py-2 z-[100]"
                  role="menu"
                  aria-orientation="vertical"
                  style={{ pointerEvents: 'auto' }}
                  onClick={(e) => {
                    // Previne que o clique no dropdown feche o menu
                    e.stopPropagation();
                  }}
                >
                  {locales.map((loc, index) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('[Desktop] Clicked on locale:', loc, 'Current locale:', locale);
                        // Fecha o menu imediatamente
                        setIsLanguageMenuOpen(false);
                        // Chama diretamente - window.location.href não precisa de setTimeout
                        console.log('[Desktop] About to call switchLocale');
                        switchLocale(loc);
                        console.log('[Desktop] switchLocale called');
                      }}
                      onMouseDown={(e) => {
                        // Previne que o mousedown feche o menu antes do onClick
                        e.stopPropagation();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setTimeout(() => {
                            switchLocale(loc);
                          }, 0);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const next = e.currentTarget.nextElementSibling as HTMLElement;
                          next?.focus();
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const prev = e.currentTarget.previousElementSibling as HTMLElement;
                          prev?.focus();
                        }
                      }}
                      role="menuitem"
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-surface ${
                        locale === loc
                          ? 'text-accent bg-surface/50'
                          : 'text-muted hover:text-text hover:bg-surface/30'
                      }`}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Menu hamburger e Language switcher */}
          <div className="md:hidden flex items-center gap-2">
            {/* Menu Hamburger */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className="p-2 text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Language switcher mobile */}
            <div className="relative">
              <button
                ref={buttonRefMobile}
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                onKeyDown={handleLanguageButtonKeyDown}
                aria-label="Select language"
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="true"
                className="p-2 text-muted hover:text-text transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </button>

              {isLanguageMenuOpen && (
                <div
                  ref={languageMenuRef}
                  className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Usa setTimeout para garantir que o estado seja atualizado antes da navegação
                        setTimeout(() => {
                          switchLocale(loc);
                        }, 0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setTimeout(() => {
                            switchLocale(loc);
                          }, 0);
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          const next = e.currentTarget.nextElementSibling as HTMLElement;
                          next?.focus();
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          const prev = e.currentTarget.previousElementSibling as HTMLElement;
                          prev?.focus();
                        }
                      }}
                      role="menuitem"
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:bg-surface ${
                        locale === loc
                          ? 'text-accent bg-surface/50'
                          : 'text-muted hover:text-text hover:bg-surface/30'
                      }`}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden absolute top-20 left-0 right-0 bg-surface/95 backdrop-blur-md border-b border-border/50 shadow-lg z-40"
            >
              <nav className="container mx-auto px-4 sm:px-6 py-4">
                <div className="flex flex-col space-y-4">
                  <Link
                    href={`/${locale}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      isActive('/')
                        ? 'text-accent'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {t('home')}
                  </Link>
                  <Link
                    href={`/${locale}/products-services`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      isActive('/products-services')
                        ? 'text-accent'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {t('products')}
                  </Link>
                  <Link
                    href={`/${locale}/smart-lab`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      isActive('/smart-lab')
                        ? 'text-accent'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {t('smartLab')}
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors py-2 ${
                      isActive('/contact')
                        ? 'text-accent'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {t('contact')}
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
