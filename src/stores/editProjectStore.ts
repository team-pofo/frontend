import { ProjectCategory } from "@/libs/enum/projectCategoryEnum";
import { create } from "zustand";

export interface EditProject {
  title: string;
  bio: string;
  urls: string[];
  imageUrls: string[];
  content: string;
  category: ProjectCategory[];
  stackNames: string[];
  setTitle: (input: string) => void;
  setBio: (input: string) => void;
  setUrls: (input: string[]) => void;
  setImageUrls: (input: string[]) => void;
  setContent: (input: string) => void;
}

export const useEditProject = create<EditProject>((set) => ({
  title: "",
  bio: "",
  urls: [""],
  imageUrls: [],
  content: "**프로젝트 소개를 입력하세요**",
  category: [],
  stackNames: [],
  setTitle: (input: string) => {
    set({ title: input });
  },
  setBio: (input: string) => {
    set({ bio: input });
  },
  setUrls: (input: string[]) => {
    set({ urls: input });
  },
  setImageUrls: (input: string[]) => {
    set({ imageUrls: input });
  },
  setContent: (input: string) => {
    set({ content: input });
  },
}));
