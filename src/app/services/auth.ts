import { apiFetch } from './config';

export interface LoginRequest {
  username: string;
  password: string;
}

// POST /api/login hanya mengembalikan token — user harus di-fetch terpisah via GET /api/user/:username
export interface LoginResponse {
  token: string;
}

export function login(data: LoginRequest) {
  return apiFetch<LoginResponse>('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
