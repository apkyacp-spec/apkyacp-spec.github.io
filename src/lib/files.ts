import { api } from './api';

export function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadProfileAttachment(profileId: number, file: File) {
  const dataUrl = await readAsDataURL(file);
  await api('/profiles/attach', 'POST', { profile_id: profileId, file_name: file.name, data_url: dataUrl });
}

