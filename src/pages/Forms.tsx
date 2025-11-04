import { useRef, useState } from 'react';
import { api } from '../lib/api';
import { uploadProfileAttachment } from '../lib/files';
import { useToast } from '../components/ui/Toast';

export default function Forms() {
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('');
  const [banks, setBanks] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const filesRef = useRef<HTMLInputElement>(null);
  const { show } = useToast();

  async function onSave() {
    if (!fio || !phone) { show('Проверь ФИО и телефон'); return; }
    try {
      const created = await api<{ id: number }>('/profiles/', 'POST', {
        fio, phone, banks, city, age: age ? Number(age) : null
      });
      const pid = created?.id;
      const files = filesRef.current?.files;
      if (pid && files && files.length) {
        for (const f of Array.from(files)) await uploadProfileAttachment(pid, f);
      }
      setFio(''); setPhone(''); setBanks(''); setCity(''); setAge(''); if (filesRef.current) filesRef.current.value = '';
      show('Анкета сохранена');
    } catch {
      show('Ошибка сохранения');
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Анкеты</h3>
      <div className="rounded-xl border border-[var(--border)] p-4 text-[var(--muted)]">
        Нажми «＋» чтобы добавить новую анкету
      </div>
      <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft space-y-2">
        <div className="font-semibold">Новая анкета</div>
        <input value={fio} onChange={e=>setFio(e.target.value)} placeholder="ФИО" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Телефон" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <input value={banks} onChange={e=>setBanks(e.target.value)} placeholder="Банки" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Город" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <input value={age} onChange={e=>setAge(e.target.value)} placeholder="Возраст" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <input ref={filesRef} type="file" multiple accept="image/*,application/pdf" className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" />
        <button onClick={onSave} className="w-full rounded-xl bg-[var(--accent)] text-white py-2">Сохранить</button>
      </div>
      <div className="space-y-2">
        <div className="rounded-xl bg-[var(--card)] p-4 shadow-soft">Список анкет появится здесь</div>
      </div>
    </div>
  );
}
