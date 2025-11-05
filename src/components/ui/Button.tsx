import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'outline' | 'secondary' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled,
  children,
  ...rest 
}: Props) {
  const base = 'rounded-2xl font-semibold transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] text-white hover:shadow-[0_8px_24px_rgba(139,92,246,0.4)] hover:scale-105',
    gradient: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] text-white hover:shadow-[0_8px_32px_rgba(139,92,246,0.5)] hover:scale-105',
    secondary: 'border-2 border-[var(--accent)] text-[var(--accent)] bg-transparent hover:bg-[var(--accent)]/10 hover:border-[var(--accent-light)]',
    outline: 'border-2 border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:bg-[var(--card-hover)] hover:border-[var(--border-light)]',
    danger: 'bg-gradient-to-r from-[var(--danger)] to-[var(--danger-light)] text-white hover:shadow-[0_8px_24px_rgba(244,63,94,0.4)] hover:scale-105'
  };
  
  return (
    <button 
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} 
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
