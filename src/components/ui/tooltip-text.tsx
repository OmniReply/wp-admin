import type { ReactNode } from 'react';

interface TooltipTextProps {
  content: string;
  children: ReactNode;
  className?: string;
}

export function TooltipText({ content, children, className = '' }: TooltipTextProps) {
  return (
    <span className={`group/tooltip relative inline-flex max-w-full items-center ${className}`}>
      <span className="min-w-0">{children}</span>
      <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-max max-w-[280px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgba(9,14,26,0.96)] px-3 py-2 text-[11px] font-medium normal-case tracking-normal text-[var(--text-main)] opacity-0 shadow-[0_16px_50px_rgba(0,0,0,0.45)] transition duration-200 group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100">
        {content}
      </span>
    </span>
  );
}
