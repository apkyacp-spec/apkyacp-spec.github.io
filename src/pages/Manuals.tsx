export default function Manuals() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Мануалы</h3>
      <input placeholder="Поиск по названию" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
      <div className="space-y-2">
        <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Пример</div>
            <span className="text-[12px] text-[var(--muted)]">Не прочитано</span>
          </div>
          <div className="mt-2"><button className="btn-outline rounded-xl border border-[var(--border)] px-3 py-2">Открыть</button></div>
        </div>
      </div>
    </div>
  );
}
