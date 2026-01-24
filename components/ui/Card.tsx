import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true }: CardProps) {
  const hoverClass = hover ? 'hover:-translate-y-1 hover:shadow-lg' : '';
  return (
    <div className={`card ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
