
import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-28 w-full rounded-2xl border border-[var(--border-soft)] bg-white/6 px-4 py-3 text-sm text-[var(--text-main)] outline-none backdrop-blur transition placeholder:text-[var(--text-soft)] focus:border-[var(--border-strong)] focus:bg-white/10',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';
