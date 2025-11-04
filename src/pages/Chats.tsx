import { useRef } from 'react';
import { send } from '../lib/ws';

export default function Chats() {
  const fileRef = useRef<HTMLInputElement>(null);

  function onAttachClick() {
    fileRef.current?.click();
  }
  function onFileChange() {
    const f = fileRef.current?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      send({ type: 'file', chatId: 'personal', fileName: f.name, dataUrl: reader.result });
    };
    reader.readAsDataURL(f);
    fileRef.current!.value = '';
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Чаты</h3>
      <div className="flex gap-2">
        <select className="flex-1 rounded-xl border border-[var(--border)] bg-transparent px-3 py-2">
          <option>Личный (с админом)</option>
        </select>
        <button className="rounded-xl border border-[var(--border)] px-3 py-2">Модерация</button>
      </div>
      <div className="min-h-[200px] rounded-xl bg-[var(--card)] p-4 shadow-soft">
        <div className="max-w-[80%] rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2">Здравствуйте! Это админ.</div>
        <div className="ml-auto max-w-[80%] rounded-2xl bg-[var(--accent)] p-2 text-white">Нужен доступ к скрытому меню.</div>
      </div>
      <div className="fixed left-0 right-0 bottom-20 bg-[var(--bg)] px-4">
        <div className="mx-auto max-w-[480px] flex gap-2 py-2">
          <button onClick={onAttachClick} className="rounded-xl border border-[var(--border)] px-3">📎</button>
          <input ref={fileRef} onChange={onFileChange} type="file" accept="image/*,application/pdf,video/*" className="hidden" />
          <input placeholder="Сообщение" className="flex-1 rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
          <button className="rounded-xl bg-[var(--accent)] px-3 py-2 text-white">📤</button>
        </div>
      </div>
    </div>
  );
}
