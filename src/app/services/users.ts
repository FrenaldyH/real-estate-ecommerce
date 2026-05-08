import { apiFetch } from './config';

export interface ApiUser {
  id: number;
  nik: string;
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string; // 'user' | 'agent' | 'owner'
  created_at: string;
}

export interface RegisterRequest {
  nik: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  username: string;
}

export interface UpdateUserRequest {
  nik?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
}

// POST /api/user
export function register(data: RegisterRequest) {
  return apiFetch<ApiUser>('/api/user', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// GET /api/user
export function getAllUsers() {
  return apiFetch<ApiUser[]>('/api/user');
}

// GET /api/user/:username
export function getUser(username: string) {
  return apiFetch<ApiUser>(`/api/user/${username}`);
}

// PUT /api/user/:username
export function updateUser(username: string, data: UpdateUserRequest) {
  return apiFetch<ApiUser>(`/api/user/${username}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /api/user (hapus akun sendiri, token required)
export function deleteUser() {
  return apiFetch<void>('/api/user', { method: 'DELETE' });
}

// PUT /api/user/role?role-name=agent — switch ke role agent
export function switchUserRole(roleName: string) {
  return apiFetch<void>(`/api/user/role?role-name=${encodeURIComponent(roleName)}`, {
    method: 'PUT',
  });
}
