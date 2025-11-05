import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { User, Wallet, CreditCard, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const balance = user?.balance || 0.00;
  const username = user?.username || '-';
  const role = user?.role || 'drop';
  const banksCount = 0;
  const paymentsCount = 0;

  const getRoleName = (r: string) => {
    if (r === 'drop' || r === 'worker') return 'Работник';
    if (r === 'dropovod') return 'Дроповод';
    if (r === 'admin') return 'Админ';
    if (r === 'kassa') return 'Касса';
    if (r === 'inkassator') return 'Инкассатор';
    return r;
  };

  return (
    <div className="space-y-5 pb-32">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold gradient-text">Профиль</h1>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
          <User size={28} className="text-white" />
        </div>
      </div>

      <Card gradient className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--gradient-end)]/20 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[var(--gradient-end)]/20 to-[var(--accent)]/20 rounded-full blur-2xl -ml-16 -mb-16" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.5)]">
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-xl mb-2">{username || 'Не указан'}</div>
              <Badge color="muted" className="text-xs">
                {getRoleName(role)}
              </Badge>
            </div>
          </div>
          <div className="pt-6 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-[var(--muted)] text-sm mb-3">
              <Wallet size={18} />
              <span>Текущий баланс</span>
            </div>
            <div className="text-5xl font-extrabold gradient-text mb-2">{balance.toFixed(2)} ₽</div>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <Sparkles size={12} />
              <span>Доступно к выводу</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card hover className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-full -mr-12 -mt-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[var(--muted)] text-xs mb-3">
              <CreditCard size={16} className="text-[var(--accent)]" />
              <span>Сданные банки</span>
            </div>
            <div className="text-3xl font-bold">{banksCount || '—'}</div>
          </div>
        </Card>
        <Card hover className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--success)]/10 to-transparent rounded-full -mr-12 -mt-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[var(--muted)] text-xs mb-3">
              <TrendingUp size={16} className="text-[var(--success)]" />
              <span>Выплат</span>
            </div>
            <div className="text-3xl font-bold">{paymentsCount || '—'}</div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Wallet size={20} className="text-[var(--accent)]" />
          История операций
        </h3>
        <div className="text-center py-12 text-[var(--muted)]">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
            <Wallet size={36} className="text-[var(--accent)] opacity-50" />
          </div>
          <p className="text-sm font-medium">Пока нет операций</p>
        </div>
      </Card>
    </div>
  );
}
