
import type { ReactNode } from 'react';

export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full w-max divide-y divide-white/10">{children}</table>;
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-white/[0.03]">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-white/6 bg-transparent">{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="transition hover:bg-white/[0.035]">{children}</tr>;
}

export function TableHeaderCell({ children }: { children: ReactNode }) {
  return <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">{children}</th>;
}

export function TableCell({
  children,
  className = '',
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { children: ReactNode }) {
  return (
    <td className={`px-4 py-4 align-top text-sm text-[var(--text-muted)] ${className}`} {...props}>
      {children}
    </td>
  );
}
