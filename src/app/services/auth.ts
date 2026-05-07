import { apiFetch } from "./config";
import type { ApiUser } from "./users";

export interface LoginRequest {
  username: string;
  password: string;
}

// Format response dari POST /api/auth/login (belum didokumentasikan backend, akan disesuaikan ke depannya)
export interface LoginResponse {
  token: string;
  user: ApiUser;
}

export function login(data: LoginRequest) {
  return apiFetch<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
