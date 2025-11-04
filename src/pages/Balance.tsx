export default function Balance() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Баланс</h3>
      <div className="text-2xl font-bold">— ₽</div>
      <div className="text-[var(--muted)]">История операций</div>
      <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft space-y-2">
        <div className="h-3 w-full rounded bg-[rgba(156,163,175,.15)]" />
        <div className="h-3 w-2/3 rounded bg-[rgba(156,163,175,.15)]" />
      </div>
      <div className="fixed left-4 right-4 bottom-24">
        <button className="w-full rounded-xl bg-[var(--accent)] text-white py-3">Вывести средства</button>
      </div>
    </div>
  );
}
