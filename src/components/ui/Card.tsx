import type { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-xl bg-[var(--card)] p-4 shadow-soft ${className}`}>{children}</div>
  );
}
