'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import catalogData from '@/content/catalog.json';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type Category = 'all' | 'services' | 'digital-products' | 'software-systems';

export function Catalog() {
  const t = useTranslations('products');
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  const catalog = catalogData[locale as keyof typeof catalogData] || catalogData.en;
  const categories = ['all', 'services', 'digital-products', 'software-systems'] as const;

  const filteredItems =
    selectedCategory === 'all'
      ? catalog.items
      : catalog.items.filter((item) => item.category === selectedCategory);

  return (
    <Section>
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('description')}
          className="mb-12"
        />

        {/* Segmented control premium */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 p-1 bg-surface rounded-xl border border-border/50 max-w-2xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-muted hover:text-text'
              }`}
            >
              {t(`categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <Card key={item.slug} className="flex flex-col">
              <div className="mb-4">
                <Badge variant="accent">
                  {t(`categories.${item.category}`)}
                </Badge>
              </div>
              <h3 className="text-xl md:text-2xl font-manrope font-bold text-text mb-3">
                {item.title}
              </h3>
              <p className="text-muted text-sm md:text-base mb-4 line-clamp-3 flex-grow">
                {item.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
              <Button
                href={`/${locale}/products-services/${item.slug}`}
                variant="ghost"
                size="sm"
                className="w-full justify-start group"
              >
                {t('viewDetails')}
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
