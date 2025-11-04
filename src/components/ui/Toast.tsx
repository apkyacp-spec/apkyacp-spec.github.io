import { createContext, useContext, useMemo, useRef, useState } from 'react';

const Ctx = createContext<{ show: (text: string) => void }>({ show: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Array<{ id: number; text: string }>>([]);
  const idRef = useRef(1);
  const api = useMemo(() => ({
    show(text: string) {
      const id = idRef.current++;
      setItems((arr) => [...arr, { id, text }]);
      setTimeout(() => setItems((arr) => arr.filter((x) => x.id !== id)), 3000);
    },
  }), []);
  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed left-0 right-0 bottom-16 flex flex-col items-center gap-2">
        {items.map(i => (
          <div key={i.id} className="pointer-events-auto rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 shadow-soft">
            {i.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() { return useContext(Ctx); }

