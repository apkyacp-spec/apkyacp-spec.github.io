import { useRef, useState } from 'react';
import { api } from '../lib/api';
import { uploadProfileAttachment } from '../lib/files';
import { useToast } from '../components/ui/Toast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Plus, Upload, User, Phone, Building2, MapPin, Calendar, Loader2 } from 'lucide-react';

export default function Forms() {
  const [fio, setFio] = useState('');
  const [phone, setPhone] = useState('');
  const [banks, setBanks] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const filesRef = useRef<HTMLInputElement>(null);
  const { show } = useToast();

  async function onSave() {
    if (!fio || !phone) { 
      show('Проверь ФИО и телефон'); 
      return; 
    }
    setLoading(true);
    try {
      const created = await api<{ id: number }>('/profiles/', 'POST', {
        fio, phone, banks, city, age: age ? Number(age) : null
      });
      const pid = created?.id;
      const files = filesRef.current?.files;
      if (pid && files && files.length) {
        for (const f of Array.from(files)) await uploadProfileAttachment(pid, f);
      }
      setFio(''); setPhone(''); setBanks(''); setCity(''); setAge(''); 
      if (filesRef.current) filesRef.current.value = '';
      show('Анкета сохранена');
    } catch {
      show('Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 pb-32">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold gradient-text">Анкеты</h1>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
          <FileText size={28} className="text-white" />
        </div>
      </div>

      <Card className="border-dashed border-2 border-[var(--border)] bg-transparent backdrop-blur-sm">
        <div className="text-center py-8 text-[var(--muted)]">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
            <Plus size={28} className="text-[var(--accent)] opacity-70" />
          </div>
          <p className="text-sm font-medium">Нажми «Добавить анкету» чтобы создать новую</p>
        </div>
      </Card>

      <Card gradient hover>
        <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center">
            <Plus size={16} className="text-white" />
          </div>
          Новая анкета
        </h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
              <User size={16} className="text-[var(--accent)]" />
              ФИО
            </label>
            <input 
              value={fio} 
              onChange={e=>setFio(e.target.value)} 
              placeholder="Введите ФИО" 
              className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
              <Phone size={16} className="text-[var(--accent)]" />
              Телефон
            </label>
            <input 
              value={phone} 
              onChange={e=>setPhone(e.target.value)} 
              placeholder="+7 (999) 123-45-67" 
              className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
              <Building2 size={16} className="text-[var(--accent)]" />
              Банки
            </label>
            <input 
              value={banks} 
              onChange={e=>setBanks(e.target.value)} 
              placeholder="Список банков" 
              className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
                <MapPin size={16} className="text-[var(--accent)]" />
                Город
              </label>
              <input 
                value={city} 
                onChange={e=>setCity(e.target.value)} 
                placeholder="Город" 
                className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
                <Calendar size={16} className="text-[var(--accent)]" />
                Возраст
              </label>
              <input 
                value={age} 
                onChange={e=>setAge(e.target.value)} 
                placeholder="Возраст" 
                type="number"
                className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-2">
              <Upload size={16} className="text-[var(--accent)]" />
              Файлы
            </label>
            <input 
              ref={filesRef} 
              type="file" 
              multiple 
              accept="image/*,application/pdf" 
              className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[var(--accent)] file:to-[var(--gradient-end)] file:text-white hover:file:opacity-90" 
            />
          </div>
          <Button 
            onClick={onSave} 
            className="w-full mt-6"
            disabled={loading}
            variant="gradient"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Сохранение...
              </>
            ) : (
              'Сохранить анкету'
            )}
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-lg mb-4">Мои анкеты</h3>
        <div className="text-center py-12 text-[var(--muted)]">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
            <FileText size={36} className="text-[var(--accent)] opacity-50" />
          </div>
          <p className="text-sm font-medium">Список анкет появится здесь</p>
        </div>
      </Card>
    </div>
  );
}
