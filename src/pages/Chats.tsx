import { useRef, useState } from 'react';
import { send } from '../lib/ws';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquare, Paperclip, Send, Shield, Sparkles } from 'lucide-react';

export default function Chats() {
  const [message, setMessage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const messages = [
    { id: 1, from: 'admin', text: 'Здравствуйте! Это админ.', timestamp: new Date() },
    { id: 2, from: 'me', text: 'Нужен доступ к скрытому меню.', timestamp: new Date() }
  ];

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

  function onSend() {
    if (!message.trim()) return;
    send({ type: 'message', chatId: 'personal', text: message });
    setMessage('');
  }

  return (
    <div className="space-y-5 pb-40">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-bold gradient-text">Чаты</h1>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] flex items-center justify-center shadow-[0_8px_24px_rgba(139,92,246,0.4)]">
          <MessageSquare size={28} className="text-white" />
        </div>
      </div>

      <div className="flex gap-3">
        <select className="flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--card)] px-4 py-3 text-base font-medium focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all">
          <option>Личный (с админом)</option>
        </select>
        <Button variant="outline" size="md">
          <Shield size={18} />
        </Button>
      </div>

      <Card className="min-h-[450px] max-h-[550px] overflow-y-auto flex flex-col p-6">
        <div className="flex-1 space-y-4 pb-4">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-[var(--muted)]">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--gradient-end)]/10 flex items-center justify-center">
                <MessageSquare size={36} className="text-[var(--accent)] opacity-50" />
              </div>
              <p className="text-sm font-medium">Нет сообщений</p>
            </div>
          ) : (
            messages.map(msg => {
              const isMe = msg.from === 'me';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-3xl px-5 py-3.5 shadow-lg ${
                    isMe 
                      ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--gradient-end)] text-white rounded-br-md' 
                      : 'bg-[var(--bg-secondary)] border border-[var(--border)] rounded-bl-md'
                  }`}>
                    <div className="text-base leading-relaxed mb-1">{msg.text}</div>
                    <div className={`text-xs flex items-center gap-1 ${
                      isMe ? 'text-white/70' : 'text-[var(--muted)]'
                    }`}>
                      {isMe && <Sparkles size={10} />}
                      {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      <div className="fixed left-0 right-0 bottom-20 px-4 py-4 z-40" style={{
        background: 'rgba(22, 33, 62, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="max-w-[480px] mx-auto flex gap-3">
          <Button 
            variant="outline" 
            size="md"
            onClick={onAttachClick}
            className="flex-shrink-0"
          >
            <Paperclip size={20} />
          </Button>
          <input 
            ref={fileRef} 
            onChange={onFileChange} 
            type="file" 
            accept="image/*,application/pdf,video/*" 
            className="hidden" 
          />
          <input 
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSend()}
            placeholder="Сообщение..." 
            className="flex-1 rounded-2xl border-2 border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-3.5 text-base focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all" 
          />
          <Button 
            onClick={onSend}
            disabled={!message.trim()}
            className="flex-shrink-0"
            variant="gradient"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
