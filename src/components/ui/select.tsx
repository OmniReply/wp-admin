
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'flex h-11 w-full rounded-2xl border border-[var(--border-soft)] bg-white/6 px-4 py-2 text-sm text-[var(--text-main)] outline-none backdrop-blur transition focus:border-[var(--border-strong)] focus:bg-white/10',
        props.className
      )}
    />
  );
}
