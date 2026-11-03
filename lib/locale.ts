import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, isLocale, matchLocale, type Locale } from '@/lib/i18n';

export async function getLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return matchLocale((await headers()).get('accept-language'));
}
