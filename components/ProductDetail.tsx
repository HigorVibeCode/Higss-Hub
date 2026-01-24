import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/ui/Divider';

type ProductDetailProps = {
  item: {
    title: string;
    shortDescription: string;
    category: string;
    tags: string[];
    whoItsFor: string;
    whatYouGet: string[];
    howItWorks: string[];
    typicalTimeline: string;
    faq: Array<{ question: string; answer: string }>;
  };
  locale: string;
};

export function ProductDetail({ item, locale }: ProductDetailProps) {
  const t = useTranslations('products');

  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/products-services`}
            className="text-muted hover:text-accent text-sm mb-8 inline-flex items-center gap-2 transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t('backToCatalog')}
          </Link>

          <div className="mb-6">
            <Badge variant="accent">
              {t(`categories.${item.category}`)}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-text mb-6 leading-tight">
            {item.title}
          </h1>

          <p className="text-xl md:text-2xl text-muted mb-12 leading-relaxed">
            {item.shortDescription}
          </p>

          <Divider className="mb-12" />

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-6">
                {t('detail.whoItsFor')}
              </h2>
              <p className="text-lg text-text/90 leading-relaxed max-w-3xl">
                {item.whoItsFor}
              </p>
            </section>

            <Divider />

            <section>
              <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-6">
                {t('detail.whatYouGet')}
              </h2>
              <ul className="space-y-4">
                {item.whatYouGet.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <svg
                      className="w-6 h-6 text-accent mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-text text-lg leading-relaxed">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Divider />

            <section>
              <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-6">
                {t('detail.howItWorks')}
              </h2>
              <ol className="space-y-6">
                {item.howItWorks.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-accent/20 text-accent rounded-full flex items-center justify-center font-bold text-lg border-2 border-accent/30">
                      {index + 1}
                    </span>
                    <span className="text-text text-lg leading-relaxed pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <Divider />

            <section>
              <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-6">
                {t('detail.timeline')}
              </h2>
              <p className="text-lg text-text/90 leading-relaxed">
                {item.typicalTimeline}
              </p>
            </section>

            {item.faq && item.faq.length > 0 && (
              <>
                <Divider />
                <section>
                  <h2 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-8">
                    {t('detail.faq')}
                  </h2>
                  <div className="space-y-4">
                    {item.faq.map((faq, index) => (
                      <Card key={index} hover={false}>
                        <h3 className="font-semibold text-text mb-3 text-lg">
                          {faq.question}
                        </h3>
                        <p className="text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </Card>
                    ))}
                  </div>
                </section>
              </>
            )}

            <Divider />

            <Card className="text-center border-accent/50 bg-surface/50">
              <h3 className="text-2xl md:text-3xl font-manrope font-bold text-text mb-6">
                {t('detail.ctaTitle')}
              </h3>
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
              >
                {t('detail.ctaButton')}
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
