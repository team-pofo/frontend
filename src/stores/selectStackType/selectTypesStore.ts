import { create } from "zustand";

interface SelectTypes {
  typeToggle: boolean;
  types: string[];
  selectedTypes: string[];
  clickTypeToggle: () => void;
  setVisibilityTypeToggle: (typeToggle: boolean) => void;
  clickType: (type: string) => void;
  resetType: () => void;
}

export const useSelectTypes = create<SelectTypes>((set) => ({
  typeToggle: false,
  types: [
    "전체",
    "웹",
    "앱",
    "게임",
    "그래픽",
    "AI",
    "임베디드",
    "라이브러리",
    "기타",
  ],
  selectedTypes: [],

  // 프로젝트 구분 토글을 클릭할 때
  clickTypeToggle: () => set((state) => ({ typeToggle: !state.typeToggle })),

  // typeToggle 값을 주어진 값으로 설정
  setVisibilityTypeToggle: (typeToggle: boolean) =>
    set({ typeToggle: typeToggle }),

  // 프로젝트 종류를 선택할 때
  clickType: (type: string) =>
    set((state) => {
      let selectedTypes;
      if (state.selectedTypes.includes(type)) {
        selectedTypes = state.selectedTypes.filter((item) => item !== type); // 이미 선택된 종류는 제거
      } else {
        if (type == "전체") {
          selectedTypes = [type];
        } else if (state.selectedTypes.includes("전체")) {
          selectedTypes = [type];
        } else {
          selectedTypes = [...state.selectedTypes, type]; // 선택되지 않은 종류는 추가
        }
      }

      return { selectedTypes };
    }),

  // 프로젝트 종류 초기화
  resetType: () => set({ selectedTypes: [] }),
}));
