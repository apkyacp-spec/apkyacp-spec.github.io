import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { filterTabsByRole } from '../roles';

const TABS = [
  { to: '/', label: 'Профиль', icon: '👤' },
  { to: '/forms', label: 'Анкеты', icon: '🧾' },
  { to: '/balance', label: 'Баланс', icon: '💰' },
  { to: '/manuals', label: 'Мануалы', icon: '📘' },
  { to: '/chats', label: 'Чаты', icon: '💬' },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = user?.role || 'drop';
  const tabs = filterTabsByRole(role, TABS);
  return (
    <nav className="fixed left-0 right-0 bottom-0 bg-[var(--card)] grid grid-cols-5 rounded-t-xl shadow-soft">
      {tabs.map(t => {
        const active = pathname === t.to;
        return (
          <Link key={t.to} to={t.to} className={`text-center py-2 ${active ? 'text-[var(--accent)] font-semibold' : 'text-[var(--muted)]'}`}>
            <span className="block text-[18px]">{t.icon}</span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
