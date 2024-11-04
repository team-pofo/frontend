import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchProjectStack {
  stackToggle: boolean;
  stacks: String[];
  selectedStacks: String[];
}

const initialState: SearchProjectStack = {
  stackToggle: false,
  stacks: ["java", "python", "C++"],
  selectedStacks: [],
};

export const searchProjectStackSlice = createSlice({
  name: "searchProjectStack",
  initialState,
  reducers: {
    // "기술 스택" 토글을 클릭하였을 때
    clickStackToggle: (state) => {
      state.stackToggle = !state.stackToggle;
    },
    setVisibilityStackToggle: (state, action: PayloadAction<boolean>) => {
      state.stackToggle = action.payload;
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
    // 기술 스택 초기화
    resetStack: (state) => {
      state.selectedStacks = [];
    },
  },
});

export const {
  clickStackToggle,
  setVisibilityStackToggle,
  inputStack,
  clickStack,
  resetStack,
} = searchProjectStackSlice.actions;

// export const stackToggle = (state: RootState) =>
//   state.searchProjectStack.stackToggle;
// export const stacks = (state: RootState) => state.searchProjectStack.stacks;
// export const selectedStacks = (state: RootState) =>
//   state.searchProjectStack.selectedStacks;

export default searchProjectStackSlice.reducer;
