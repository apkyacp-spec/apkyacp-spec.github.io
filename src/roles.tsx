import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ACCESS: Record<string, string[]> = {
  drop: ['/', '/balance', '/manuals', '/chats'],
  worker: ['/', '/balance', '/manuals', '/chats'], // алиас для drop
  dropovod: ['/', '/forms', '/balance', '/manuals', '/chats'],
  kassa: ['/', '/balance', '/manuals', '/chats'],
  inkassator: ['/', '/balance', '/manuals', '/chats'],
  admin: ['/', '/forms', '/balance', '/manuals', '/chats'],
};

export function canAccessPath(role: string, path: string) {
  const allow = ACCESS[role] || ACCESS.drop;
  // normalize no trailing slash
  const p = path === '' ? '/' : path;
  return allow.includes(p);
}

export function RequireAccess({ children }: PropsWithChildren) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return null;
  const role = user?.role || 'drop';
  if (!canAccessPath(role, loc.pathname)) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export function filterTabsByRole<T extends { to: string }>(role: string, tabs: T[]): T[] {
  return tabs.filter(t => canAccessPath(role, t.to));
}
