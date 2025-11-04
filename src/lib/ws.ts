let socket: WebSocket | null = null;
let tokenGetter: () => string | null = () => null;

export function setTokenGetter(fn: () => string | null) { tokenGetter = fn; }

export function connect(onMessage: (data: any) => void) {
  const token = tokenGetter();
  const envUrl = (import.meta as any).env?.VITE_WS_URL as string | undefined;
  let url = envUrl;
  if (!url) {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    const host = (new URL((import.meta as any).env?.VITE_API_BASE || window.location.origin)).host;
    url = `${proto}://${host}/ws?token=${encodeURIComponent(token || '')}`;
  } else {
    url = `${url}?token=${encodeURIComponent(token || '')}`;
  }
  try {
    socket?.close();
  } catch {}
  socket = new WebSocket(url);
  socket.onmessage = (ev) => {
    try { onMessage(JSON.parse(ev.data)); } catch {}
  };
}

export function send(data: any) {
  if (socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(data));
}
