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

const getInitialAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || null;
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!getInitialAccessToken(),
  accessToken: getInitialAccessToken(),
  user: null,

  login: (token, user) => {
    localStorage.setItem("accessToken", token);
    set({ isLoggedIn: true, user });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, accessToken: null, user: null });
  },

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
}));
