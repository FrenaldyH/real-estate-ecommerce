import { apiFetch } from './config';
import type { ApiUser } from './users';

export interface ApiAgent {
  id: number;
  user_id: number;
  agency_id: number;
  bio_description: string;
  total_properties_sold: number;
  siup4: string;
  created_at: string;
  // GET /api/agent/:username => user kosong {}
  // GET /api/agent dan GET /api/agent/top => user terisi
  user: ApiUser;
}

export interface CreateAgentRequest {
  bio_description: string;
  agency_id: number;
  siup4: string;
}

export interface UpdateAgentRequest {
  // user fields
  nik?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  // agent fields
  bio_description?: string;
  agency_id?: number;
  siup4?: string;
}

// GET /api/agent
export function getAllAgents() {
  return apiFetch<ApiAgent[]>('/api/agent');
}

// GET /api/agent/:username
export function getAgent(username: string) {
  return apiFetch<ApiAgent>(`/api/agent/${username}`);
}

// GET /api/agent/top?limit=
export function getTopAgents(limit?: number) {
  const query = limit ? `?limit=${limit}` : '';
  return apiFetch<ApiAgent[]>(`/api/agent/top${query}`);
}

// POST /api/agent
export function createAgent(data: CreateAgentRequest) {
  return apiFetch<ApiAgent>('/api/agent', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /api/agent/:username
export function updateAgent(username: string, data: UpdateAgentRequest) {
  return apiFetch<ApiAgent>(`/api/agent/${username}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /api/agent (hapus akun agent sendiri, token required)
export function deleteAgent() {
  return apiFetch<void>('/api/agent', { method: 'DELETE' });
}

// PUT /api/agent/role?role-name=
export function switchAgentRole(roleName: string) {
  return apiFetch<void>(`/api/agent/role?role-name=${encodeURIComponent(roleName)}`, {
    method: 'PUT',
  });
}
