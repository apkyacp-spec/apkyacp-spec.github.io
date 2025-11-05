import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { filterTabsByRole } from '../roles';
import { User, FileText, Wallet, BookOpen, MessageSquare } from 'lucide-react';

const TABS = [
  { to: '/', label: 'Профиль', icon: User },
  { to: '/forms', label: 'Анкеты', icon: FileText },
  { to: '/balance', label: 'Баланс', icon: Wallet },
  { to: '/manuals', label: 'Мануалы', icon: BookOpen },
  { to: '/chats', label: 'Чаты', icon: MessageSquare },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = user?.role || 'drop';
  const tabs = filterTabsByRole(role, TABS);
  
  if (tabs.length === 0) return null;
  
  return (
    <nav 
      className="fixed left-0 right-0 bottom-0 z-[9999]"
      style={{
        background: 'rgb(22, 33, 62)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 -4px 32px rgba(0, 0, 0, 0.5)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <div className="grid max-w-[480px] mx-auto" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map(t => {
          const active = pathname === t.to;
          const Icon = t.icon;
          return (
            <Link 
              key={t.to} 
              to={t.to} 
              className={`
                relative flex flex-col items-center justify-center py-4 gap-1.5
                transition-all duration-300
                ${active 
                  ? 'text-[var(--accent)]' 
                  : 'text-[var(--muted)] hover:text-[var(--accent)]'
                }
              `}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
              )}
              <div className={`
                p-2.5 rounded-2xl transition-all duration-300
                ${active 
                  ? 'bg-gradient-to-br from-[var(--accent)]/20 to-[var(--gradient-end)]/20 scale-110' 
                  : 'hover:bg-[var(--card)]'
                }
              `}>
                <Icon 
                  size={22} 
                  strokeWidth={active ? 2.5 : 2}
                  className={active ? 'drop-shadow-lg' : ''}
                />
              </div>
              <span className={`text-[11px] font-semibold transition-all ${active ? 'scale-110' : ''}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
