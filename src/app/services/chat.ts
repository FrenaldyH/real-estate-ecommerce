import { apiFetch } from './config';

export function sendChatMessage(message: string) {
  return apiFetch<{ reply: string }>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}
