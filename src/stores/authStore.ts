import { IUser } from "@/lib/interface/iUser";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: IUser | null;
  isAuthLoading: boolean;
  setIsAuthLoading: (loading: boolean) => void;
  login: (user: IUser) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  isAuthLoading: true,

  setIsAuthLoading: (loading: boolean) => {
    set({ isAuthLoading: loading });
  },

  login: (user: IUser) => {
    set({ isLoggedIn: true, user: user });
  },

  logout: () => {
    set({ isLoggedIn: false, accessToken: null, user: null });
  },

  setAccessToken: (token) => {
    set({ accessToken: token });
  },
}));
