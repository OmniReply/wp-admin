
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  return (
    createPortal(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div
        className="w-full max-h-[80vh] overflow-y-auto max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,20,35,0.98),rgba(10,15,28,0.95))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>, document.body)
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="border-b border-white/8 px-6 py-5">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-['Fraunces'] text-xl font-semibold text-[var(--text-main)]">{children}</h3>;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="p-6">{children}</div>;
}
