import { create } from "zustand";

type SidebarStore = {
  sidebarIndex: number;
  setSidebarIndex: (index: number) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarIndex: 0,
  setSidebarIndex: (index: number) => set({ sidebarIndex: index }),
}));
