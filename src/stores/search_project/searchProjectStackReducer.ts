import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface SearchProjectStack {
  toggle: boolean;
  stacks: String[];
  selectedStacks: String[];
}

const initialState: SearchProjectStack = {
  toggle: false,
  stacks: ["java", "python", "C++"],
  selectedStacks: [],
};

export const searchProjectStackSlice = createSlice({
  name: "searchProjectStack",
  initialState,
  reducers: {
    // "기술 스택" 토글을 클릭하였을 때
    clickToggle: (state) => {
      state.toggle = !state.toggle;
    },
    // 검색창에 기술 스택을 입력하였을 때
    inputStack: (state, action) => {
      // Todo: 서버에서 기술 스택 목록 받아오기
      const searchStack = action.payload;
      if (searchStack == "") {
        state.stacks = ["java", "python", "C++"];
      } else {
        state.stacks = ["java", "python", "C++", searchStack];
      }
    },
    // 기술 스택을 선택하였을 때
    clickStack: (state, action) => {
      const stack = action.payload;
      if (state.selectedStacks.includes(stack)) {
        state.selectedStacks = state.selectedStacks.filter(
          (item) => item !== stack
        );
      } else {
        state.selectedStacks = [...state.selectedStacks, stack];
      }
    },
  },
});

export const { clickToggle, inputStack, clickStack } =
  searchProjectStackSlice.actions;

export const selectToggle = (state: RootState) =>
  state.searchProjectStack.toggle;
export const selectStacks = (state: RootState) =>
  state.searchProjectStack.stacks;
export const selectSelectedStacks = (state: RootState) =>
  state.searchProjectStack.selectedStacks;

export default searchProjectStackSlice.reducer;
