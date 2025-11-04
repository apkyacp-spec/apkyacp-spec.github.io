export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

let authToken: string | null = null;
export function setToken(token: string | null) { authToken = token; }

const BASE_URL = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8000';

export async function api<T = any>(path: string, method: HttpMethod = 'GET', body?: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (res.status === 401) {
    // let upper layer re-init auth; simple throw for now
    throw new Error('unauthorized');
  }
  if (!res.ok) throw new Error('api_error');
  return res.json();
}
