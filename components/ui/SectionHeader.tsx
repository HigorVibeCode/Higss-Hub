import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`section-header text-center ${className}`}>
      {eyebrow && (
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider text-muted font-medium">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-manrope font-bold text-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
