
import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'neutral' | 'success' | 'danger' | 'warning' | 'info';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: 'border-white/10 bg-white/[0.06] text-[var(--text-main)]',
  success: 'border-emerald-300/20 bg-emerald-400/15 text-emerald-200',
  danger: 'border-rose-300/20 bg-rose-400/15 text-rose-200',
  warning: 'border-amber-300/20 bg-amber-400/18 text-amber-100',
  info: 'border-sky-300/20 bg-sky-400/15 text-sky-200',
};

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.01em]',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
