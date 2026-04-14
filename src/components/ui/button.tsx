
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-[0.02em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'default' &&
          'bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-slate-950 shadow-[0_14px_36px_rgba(var(--accent-rgb),0.32)] hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(var(--accent-rgb),0.4)]',
        variant === 'outline' &&
          'border border-[var(--border-soft)] bg-white/5 text-[var(--text-main)] backdrop-blur hover:border-[var(--border-strong)] hover:bg-white/10',
        variant === 'destructive' && 'bg-red-500/90 text-white hover:bg-red-400',
        variant === 'ghost' && 'text-[var(--text-muted)] hover:bg-white/6 hover:text-[var(--text-main)]',
        className
      )}
      {...props}
    />
  );
}
