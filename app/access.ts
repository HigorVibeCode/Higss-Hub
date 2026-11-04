'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ActionResult } from '@/components/admin/ActionForm';
import { SLUG_RE } from '@/lib/domain';
import { env } from '@/lib/env';
import { getDictionary, isLocale } from '@/lib/i18n';
import { readHub } from '@/lib/store';

/** "Crea Glass" → "creaglass"; accents and spaces don't matter when typing the name. */
function toSlug(input: string) {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '');
}

/** Opens <slug>.higsshub.com only when the exact project name exists; nothing is ever listed. */
export async function openProject(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const locale = String(formData.get('locale'));
  const t = getDictionary(isLocale(locale) ? locale : 'en');
  const slug = toSlug(String(formData.get('project') ?? ''));
  const exists = SLUG_RE.test(slug) && (await readHub()).clients.some((c) => c.slug === slug);
  if (!exists) {
    await new Promise((r) => setTimeout(r, 400)); // makes guessing names slower
    return { error: t.accessNotFound };
  }
  const host = ((await headers()).get('host') ?? '').split(':')[0];
  const onMainDomain = host === env.rootDomain || host === `www.${env.rootDomain}`;
  redirect(onMainDomain ? `https://${slug}.${env.rootDomain}` : `/c/${slug}`);
}
