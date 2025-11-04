import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ open: boolean; onClose: () => void; title?: string }>;

export function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[420px] rounded-xl bg-[var(--card)] p-4 shadow-soft">
        {title ? <div className="mb-2 font-semibold">{title}</div> : null}
        {children}
        <div className="mt-3 flex justify-end">
          <button onClick={onClose} className="rounded-xl border border-[var(--border)] px-3 py-2">Закрыть</button>
        </div>
      </div>
    </div>
  );
}
