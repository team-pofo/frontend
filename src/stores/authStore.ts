import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: { id: string; name: string } | null;
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null }),
  setAccessToken: (token) => set({ accessToken: token }),
}));
