import { create } from "zustand";
import { ProjectCategory } from "@/libs/enum/projectCategoryEnum";

interface SelectTypes {
  typeToggle: boolean;
  types: ProjectCategory[];
  selectedTypes: ProjectCategory[];
  clickTypeToggle: () => void;
  setVisibilityTypeToggle: (typeToggle: boolean) => void;
  clickType: (type: ProjectCategory) => void;
  resetType: () => void;
}

export const useSelectTypes = create<SelectTypes>((set) => ({
  typeToggle: false,
  types: [
    ProjectCategory.WEB,
    ProjectCategory.APP,
    ProjectCategory.GAME,
    ProjectCategory.GRAPHIC,
    ProjectCategory.AI,
    ProjectCategory.EMBEDDED,
    ProjectCategory.LIBRARY,
    ProjectCategory.ETC,
  ],
  selectedTypes: [],

  // 프로젝트 구분 토글을 클릭할 때
  clickTypeToggle: () => set((state) => ({ typeToggle: !state.typeToggle })),

  // typeToggle 값을 주어진 값으로 설정
  setVisibilityTypeToggle: (typeToggle: boolean) =>
    set({ typeToggle: typeToggle }),

  // 프로젝트 종류를 선택할 때
  clickType: (type: ProjectCategory) =>
    set((state) => {
      let selectedTypes;
      if (state.selectedTypes.includes(type)) {
        selectedTypes = state.selectedTypes.filter((item) => item !== type); // 이미 선택된 종류는 제거
      } else {
        selectedTypes = [...state.selectedTypes, type]; // 선택되지 않은 종류는 추가
      }

      return { selectedTypes };
    }),

  // 프로젝트 종류 초기화
  resetType: () => set({ selectedTypes: [] }),
}));
