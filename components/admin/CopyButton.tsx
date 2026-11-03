'use client';

import { useState } from 'react';

export function CopyButton({ value, label = 'Copiar endereço' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      {copied ? 'Copiado ✓' : label}
    </button>
  );
}
