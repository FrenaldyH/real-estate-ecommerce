import { createContext, useContext, useState, ReactNode } from 'react';
import type { ApiUser } from '../services/users';
import { login as apiLogin } from '../services/auth';
import { getUser } from '../services/users';

interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('rumahku-token')
  );
  const [user, setUser] = useState<ApiUser | null>(() => {
    const stored = localStorage.getItem('rumahku-user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username: string, password: string) => {
    // Step 1: dapatkan token dari POST /api/login
    const { token: newToken } = await apiLogin({ username, password });
    localStorage.setItem('rumahku-token', newToken);
    setToken(newToken);

    // Step 2: fetch data user dari GET /api/user/:username
    const userData = await getUser(username);
    localStorage.setItem('rumahku-user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('rumahku-token');
    localStorage.removeItem('rumahku-user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus digunakan di dalam AuthProvider');
  return ctx;
}
