'use client';

import { useRef } from 'react';
import { setLocale } from '@/app/actions';
import { localeNames, locales, type Locale } from '@/lib/i18n';

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={setLocale}>
      <label className="sr-only" htmlFor="locale">
        {label}
      </label>
      <select
        id="locale"
        name="locale"
        defaultValue={current}
        onChange={() => formRef.current?.requestSubmit()}
        className="cursor-pointer rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-muted hover:text-text focus:border-accent focus:outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
      <noscript>
        <button type="submit" className="btn-ghost ml-2">
          OK
        </button>
      </noscript>
    </form>
  );
}
