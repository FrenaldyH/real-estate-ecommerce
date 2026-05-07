import { apiFetch } from './config';
import type { ApiUser } from './users';

// Shape dari response backend untuk agent
export interface ApiAgent {
  id: number;
  user_id: number;
  agency_id: number;
  bio_description: string;
  total_properties_sold: number;
  siup4: string;
  created_at: string;
  // Catatan: GET /api/agent/:username mengembalikan user kosong {}
  // GET /api/agent dan GET /api/agent/top mengembalikan user terisi
  user: ApiUser;
}

export function getAllAgents() {
  return apiFetch<ApiAgent[]>('/api/agent');
}

export function getAgent(username: string) {
  return apiFetch<ApiAgent>(`/api/agent/${username}`);
}

export function getTopAgents(limit?: number) {
  const query = limit ? `?limit=${limit}` : '';
  return apiFetch<ApiAgent[]>(`/api/agent/top${query}`);
}

export function createAgent(data: { bio_description: string; siup4: string }) {
  return apiFetch<ApiAgent>('/api/agent', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateAgent(username: string, data: Partial<{ bio_description: string; siup4: string }>) {
  return apiFetch<ApiAgent>(`/api/agent/${username}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteAgent(username: string) {
  return apiFetch<void>(`/api/agent/${username}`, { method: 'DELETE' });
}
