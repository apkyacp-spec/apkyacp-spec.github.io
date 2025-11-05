import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Balance() {
  const balance = 0.00;
  const transactions: any[] = [];

  return (
    <div className="space-y-5 pb-32">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold gradient-text">Баланс</h1>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
          <Wallet size={28} className="text-white" />
        </div>
      </div>

      <Card className="relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/30 via-[var(--gradient-end)]/20 to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--gradient-end)]/20 to-transparent rounded-full blur-2xl -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm mb-3">
            <Wallet size={18} />
            <span>Текущий баланс</span>
          </div>
          <div className="text-6xl font-extrabold text-white mb-2 drop-shadow-lg">{balance.toFixed(2)} ₽</div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Sparkles size={14} />
            <span>Доступно к выводу</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
          <TrendingUp size={20} className="text-[var(--accent)]" />
          История операций
        </h3>
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-[var(--muted)]">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
              <Wallet size={36} className="text-[var(--accent)] opacity-50" />
            </div>
            <p className="text-sm font-medium">Пока нет операций</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    tx.type === 'accrual' 
                      ? 'bg-gradient-to-br from-[var(--success)]/20 to-[var(--success-light)]/20' 
                      : 'bg-gradient-to-br from-[var(--danger)]/20 to-[var(--danger-light)]/20'
                  }`}>
                    {tx.type === 'accrual' ? (
                      <TrendingUp size={20} className="text-[var(--success)]" />
                    ) : (
                      <TrendingDown size={20} className="text-[var(--danger)]" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-base">{tx.reason || 'Операция'}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {new Date(tx.created_at).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
                <div className={`font-bold text-lg ${
                  tx.type === 'accrual' ? 'text-[var(--success)]' : 'text-[var(--danger)]'
                }`}>
                  {tx.type === 'accrual' ? '+' : '-'}{tx.amount.toFixed(2)} ₽
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="pb-4">
        <Button 
          className="w-full" 
          size="lg"
          variant="gradient"
          onClick={() => {
            // TODO: Implement withdrawal
          }}
        >
          <ArrowUpRight size={20} />
          Вывести средства
        </Button>
      </div>
    </div>
  );
}
