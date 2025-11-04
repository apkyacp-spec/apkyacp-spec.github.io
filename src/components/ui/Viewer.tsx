import { useEffect } from 'react';
import { Modal } from './Modal';

type Props = { open: boolean; onClose: () => void; url?: string; type?: 'pdf' | 'video' | 'image' | 'file'; title?: string };

export function Viewer({ open, onClose, url, type, title }: Props) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);
  return (
    <Modal open={open} onClose={onClose} title={title || 'Просмотр'}>
      <div className="h-[60vh] overflow-hidden rounded-xl border border-[var(--border)] bg-black">
        {type === 'pdf' ? (
          <embed className="h-full w-full" src={url} type="application/pdf" />
        ) : type === 'video' ? (
          <video className="h-full w-full" src={url} controls />
        ) : type === 'image' ? (
          <img className="h-full w-full object-contain" src={url} />
        ) : (
          <iframe className="h-full w-full" src={url} />
        )}
      </div>
    </Modal>
  );
}

