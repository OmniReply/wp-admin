
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  id?: number;
  username?: string;
  nickname?: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setAuth: (token: string, user: AuthUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    { name: 'wp-admin-auth' }
  )
);
