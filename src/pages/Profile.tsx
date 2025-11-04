export default function Profile() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Профиль</h3>
      <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft space-y-2">
        <div>Роль: <b>drop</b></div>
        <div>Юзернейм: <b>-</b></div>
        <div>Баланс: <b>0.00</b> ₽</div>
      </div>
      <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[12px] text-[var(--muted)]">Сданные банки</div>
            <div className="font-bold">—</div>
          </div>
          <div>
            <div className="text-[12px] text-[var(--muted)]">Кол-во выплат</div>
            <div className="font-bold">—</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft">
        <div className="font-semibold mb-2">История операций</div>
        <div className="text-[var(--muted)]">Пока нет операций</div>
      </div>
    </div>
  );
}
