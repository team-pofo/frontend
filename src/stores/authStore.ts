import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: { id: number; email: string; role: string } | null;
  login: (
    token: string,
    user: { id: number; email: string; role: string },
  ) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,

  login: (token, user) => {
    set({ isLoggedIn: true, user });
  },

  logout: () => {
    set({ isLoggedIn: false, accessToken: null, user: null });
  },

  setAccessToken: (token) => {
    set({ accessToken: token });
  },
}));
