import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setToken as setApiToken } from '../lib/api';
import { setTokenGetter } from '../lib/ws';

export type User = { id: number; username?: string | null; role: string; balance: number } | null;

type AuthCtx = {
  user: User;
  token: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, token: null, loading: true, refresh: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function doAuth() {
      try {
        const tg: any = (window as any).Telegram?.WebApp;
        const u = tg?.initDataUnsafe?.user || {};
        const payload = {
          data: {
            user: { id: u.id, username: u.username, first_name: u.first_name, last_name: u.last_name },
            hash: tg?.initDataUnsafe?.hash || '',
            auth_date: tg?.initDataUnsafe?.auth_date || ''
          }
        };
        const resp = await api<{ access_token: string; user: User }>('/auth/telegram', 'POST', payload);
        setToken(resp.access_token);
        setApiToken(resp.access_token);
        setTokenGetter(() => resp.access_token);
        setUser(resp.user);
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    doAuth();
  }, []);

  const value = useMemo(() => ({ user, token, loading, refresh: async () => {} }), [user, token, loading]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() { return useContext(Ctx); }

