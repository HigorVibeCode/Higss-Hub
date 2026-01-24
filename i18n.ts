import { getRequestConfig } from 'next-intl/server';
import { requestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'de', 'pt', 'fr', 'es', 'it'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
