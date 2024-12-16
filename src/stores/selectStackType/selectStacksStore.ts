import { create } from "zustand";

interface SelectStacks {
  stackToggle: boolean;
  stacks: string[];
  selectedStacks: string[];
  clickStackToggle: () => void;
  setVisibilityStackToggle: (stackToggle: boolean) => void;
  inputStack: (searchStack: string) => void;
  clickStack: (stack: string) => void;
  resetStack: () => void;
}

export const useSelectStacks = create<SelectStacks>((set) => ({
  stackToggle: false,
  stacks: ["java", "python", "C++"],
  selectedStacks: [],

  // 기술 스택 토글을 클릭할 때
  clickStackToggle: () => set((state) => ({ stackToggle: !state.stackToggle })),

  // stackToggle 값을 주어진 값으로 설정
  setVisibilityStackToggle: (stackToggle: boolean) => set({ stackToggle }),

  // 검색창에 기술 스택을 입력할 때
  // Todo: 서버에서 기술 스택 목록 받아오기
  inputStack: (searchStack: string) =>
    set(() => {
      if (searchStack === "") {
        return { stacks: ["java", "python", "C++"] }; // 기본값으로 복원
      } else {
        return { stacks: ["java", "python", "C++", searchStack] }; // 검색된 스택 추가
      }
    }),

  // 기술 스택을 선택할 때
  clickStack: (stack: string) =>
    set((state) => {
      const selectedStacks = state.selectedStacks.includes(stack)
        ? state.selectedStacks.filter((item) => item !== stack) // 이미 선택된 스택은 제거
        : [...state.selectedStacks, stack]; // 선택되지 않은 스택은 추가
      return { selectedStacks };
    }),

  // 기술 스택 초기화
  resetStack: () => set({ selectedStacks: [] }),
}));
