import { IUser } from "@/libs/interface/iUser";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: IUser | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,
  user: null,

  login: (token, user) => {
    set({ isLoggedIn: true, user: user });
  },

  logout: () => {
    set({ isLoggedIn: false, accessToken: null, user: null });
  },

  setAccessToken: (token) => {
    set({ accessToken: token });
  },
}));
