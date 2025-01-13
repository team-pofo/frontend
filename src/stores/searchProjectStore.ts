import { IProjectCard } from "@/lib/interface/iProjectCard";
import { create } from "zustand";

export interface SearchProject {
  page: number;
  hasNext: boolean;
  title: string;
  searchTitle: string;
  categories: string[];
  stackNames: string[];
  projects: IProjectCard[];
  setPage: (input: number) => void;
  setHasNext: (input: boolean) => void;
  setTitle: (input: string) => void;
  setSearchTitle: (input: string) => void;
  setProjects: (input: IProjectCard[]) => void;
  setStackNames: (input: string[]) => void;
  setCategories: (input: string[]) => void;
}

export const useSearchProject = create<SearchProject>((set) => ({
  page: 0,
  hasNext: false,
  title: "",
  searchTitle: "",
  categories: [],
  stackNames: [],
  projects: [],
  setPage: (input: number) => {
    set({ page: input });
  },
  setHasNext: (input: boolean) => {
    set({ hasNext: input });
  },
  setTitle: (input: string) => {
    set({ title: input });
  },
  setSearchTitle: (input: string) => {
    set({ searchTitle: input });
  },
  setProjects: (input: IProjectCard[]) => {
    set({ projects: input });
  },
  setStackNames: (input: string[]) => {
    set({ stackNames: input });
  },
  setCategories: (input: string[]) => {
    set({ categories: input });
  },
}));
