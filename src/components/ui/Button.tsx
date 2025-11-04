import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'secondary' };

export function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const base = 'rounded-xl px-3 py-2';
  const styles = variant === 'primary'
    ? 'bg-[var(--accent)] text-white'
    : variant === 'secondary'
    ? 'border border-[var(--accent)] text-[var(--accent)] bg-transparent'
    : 'border border-[var(--border)] bg-transparent text-[var(--text)]';
  return <button className={`${base} ${styles} ${className}`} {...rest} />
}
