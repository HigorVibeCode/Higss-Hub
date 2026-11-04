'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { openProject } from '@/app/access';
import type { Locale } from '@/lib/i18n';

type Labels = { label: string; placeholder: string; button: string };

function OpenButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary min-h-12 rounded-xl px-6 text-base">
      {pending ? '…' : label} <span aria-hidden>→</span>
    </button>
  );
}

export function ProjectAccess({
  locale,
  labels,
  suffix,
  compact = false,
  inputId = 'project',
}: {
  locale: Locale;
  labels: Labels;
  suffix: string;
  /** Hides the visible label when the surrounding text already says what the field is for. */
  compact?: boolean;
  inputId?: string;
}) {
  const [state, action] = useActionState(openProject, null);
  return (
    <form action={action} className={`${compact ? 'mt-3' : 'mt-10'} text-left`}>
      <input type="hidden" name="locale" value={locale} />
      <label htmlFor={inputId} className={compact ? 'sr-only' : 'mb-2 block text-sm font-medium text-muted'}>
        {labels.label}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-h-12 flex-1 items-center rounded-xl border border-border bg-surface pr-4 focus-within:border-accent">
          <input
            id={inputId}
            name="project"
            required
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={labels.placeholder}
            aria-invalid={Boolean(state?.error)}
            aria-describedby={state?.error ? `${inputId}-error` : undefined}
            className="min-w-0 flex-1 bg-transparent py-3 pl-4 text-lg text-text placeholder:text-muted/50 focus:outline-none"
          />
          <span className="hidden shrink-0 text-muted/70 sm:inline">{suffix}</span>
        </div>
        <OpenButton label={labels.button} />
      </div>
      {state?.error && (
        <p id={`${inputId}-error`} role="alert" className="mt-3 text-sm text-danger">
          {state.error}
        </p>
      )}
    </form>
  );
}
