import { apiFetch } from './config';

// Shape dari response backend untuk user
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

// Body untuk POST /api/user (registrasi)
export interface RegisterRequest {
  nik: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  username: string;
}

// Body untuk PUT /api/user/:username (update profil)
export interface UpdateUserRequest {
  nik?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
}

export function register(data: RegisterRequest) {
  return apiFetch<ApiUser>('/api/user', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getAllUsers() {
  return apiFetch<ApiUser[]>('/api/user');
}

export function getUser(username: string) {
  return apiFetch<ApiUser>(`/api/user/${username}`);
}

export function updateUser(username: string, data: UpdateUserRequest) {
  return apiFetch<ApiUser>(`/api/user/${username}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteUser(username: string) {
  return apiFetch<void>(`/api/user/${username}`, { method: 'DELETE' });
}
