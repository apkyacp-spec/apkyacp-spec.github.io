import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ color?: 'success' | 'warn' | 'danger' | 'muted'; className?: string }>;

export function Badge({ color = 'muted', className = '', children }: Props) {
  const map: Record<string, string> = {
    success: 'bg-[rgba(34,197,94,.15)] text-[var(--success)]',
    warn: 'bg-[rgba(234,179,8,.15)] text-[#EAB308]',
    danger: 'bg-[rgba(248,113,113,.15)] text-[var(--danger)]',
    muted: 'bg-[rgba(156,163,175,.15)] text-[var(--muted)]',
  };
  return <span className={`inline-block rounded-full px-2 py-1 text-[12px] ${map[color]} ${className}`}>{children}</span>;
}
