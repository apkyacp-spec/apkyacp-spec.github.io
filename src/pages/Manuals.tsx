import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, Search, FileText, Video, CheckCircle2 } from 'lucide-react';

export default function Manuals() {
  const [search, setSearch] = useState('');
  const manuals = [
    { id: 1, title: 'Пример инструкции', type: 'pdf', read: false },
    { id: 2, title: 'Видео-руководство', type: 'video', read: true }
  ];

  const filteredManuals = manuals.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-32">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold gradient-text">Мануалы</h1>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
          <BookOpen size={28} className="text-white" />
        </div>
      </div>

      <div className="relative">
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по названию" 
          className="w-full rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-5 pl-14 py-4 text-base font-medium focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
        />
      </div>

      <div className="space-y-4">
        {filteredManuals.length === 0 ? (
          <Card>
            <div className="text-center py-16 text-[var(--muted)]">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
                <BookOpen size={36} className="text-[var(--accent)] opacity-50" />
              </div>
              <p className="text-sm font-medium">Мануалы не найдены</p>
            </div>
          </Card>
        ) : (
          filteredManuals.map(manual => (
            <Card key={manual.id} hover className="cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    manual.type === 'video' 
                      ? 'bg-gradient-to-br from-[var(--accent)]/20 to-[var(--gradient-end)]/20' 
                      : 'bg-gradient-to-br from-[var(--muted)]/20 to-[var(--muted)]/10'
                  }`}>
                    {manual.type === 'video' ? (
                      <Video size={24} className="text-[var(--accent)]" />
                    ) : (
                      <FileText size={24} className="text-[var(--muted)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-lg mb-2">{manual.title}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge color="muted" className="text-xs">
                        {manual.type === 'video' ? 'Видео' : 'PDF'}
                      </Badge>
                      {manual.read && (
                        <Badge color="success" className="text-xs flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Прочитано
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="md">
                  Открыть
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
