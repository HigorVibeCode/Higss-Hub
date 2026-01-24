interface BadgeProps {
  children: string;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-surface border border-border text-muted',
    accent: 'bg-accent/10 border border-accent/20 text-accent',
  };

  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
