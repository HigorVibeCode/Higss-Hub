import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'default' | 'surface';
  className?: string;
}

export function Section({ children, variant = 'default', className = '' }: SectionProps) {
  const bgClass = variant === 'surface' ? 'bg-surface' : '';
  return (
    <section className={`section ${bgClass} ${className}`}>
      {children}
    </section>
  );
}
