// Base URL dibaca dari .env ke VITE_API_URL, fallback ke localhost:8080
export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('rumahku-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Wrapper fetch yang otomatis:
 * - Menambahkan Content-Type: application/json
 * - Menambahkan Authorization header jika sudah login
 * - Melempar Error jika response gagal atau success: false
 * - Mengembalikan field `data` dari response JSON
 */
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(options.headers as Record<string, string> ?? {}),
    },
    ...options,
  });

  const json = await res.json();

  if (!res.ok || json.success === false) {
    throw new Error(json.error ?? json.message ?? `Request gagal (HTTP ${res.status})`);
  }

  return json.data as T;
}
