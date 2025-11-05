import type { PropsWithChildren } from 'react';

export function Card({ 
  children, 
  className = '',
  hover = false,
  gradient = false
}: PropsWithChildren<{ 
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}>) {
  return (
    <div 
      className={`
        relative rounded-3xl p-6
        ${gradient 
          ? 'bg-gradient-to-br from-[var(--card)] to-[var(--card-hover)]' 
          : 'bg-[var(--card)]'
        }
        border border-[var(--border)]
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        backdrop-blur-xl
        transition-all duration-300
        ${hover ? 'hover:shadow-[0_12px_48px_rgba(139,92,246,0.4)] hover:border-[var(--accent)]/50 hover:scale-[1.02] hover:-translate-y-1' : ''}
        ${className}
      `}
      style={{
        background: gradient 
          ? `linear-gradient(135deg, var(--card) 0%, var(--card-hover) 100%)`
          : undefined
      }}
    >
      {children}
    </div>
  );
}
