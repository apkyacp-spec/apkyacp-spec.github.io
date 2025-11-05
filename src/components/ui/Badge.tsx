import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ color?: 'success' | 'warn' | 'danger' | 'muted'; className?: string }>;

export function Badge({ color = 'muted', className = '', children }: Props) {
  const map: Record<string, string> = {
    success: 'bg-gradient-to-r from-[var(--success)]/20 to-[var(--success-light)]/20 text-[var(--success)] border border-[var(--success)]/30 shadow-[0_4px_12px_rgba(16,185,129,0.2)]',
    warn: 'bg-gradient-to-r from-[var(--warning)]/20 to-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/30 shadow-[0_4px_12px_rgba(245,158,11,0.2)]',
    danger: 'bg-gradient-to-r from-[var(--danger)]/20 to-[var(--danger-light)]/20 text-[var(--danger)] border border-[var(--danger)]/30 shadow-[0_4px_12px_rgba(244,63,94,0.2)]',
    muted: 'bg-[var(--bg-secondary)] text-[var(--muted)] border border-[var(--border)]',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${map[color]} ${className}`}>
      {children}
    </span>
  );
}
