import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectType {
  typeToggle: boolean;
  types: string[];
  selectedTypes: string[];
}

const initialState: selectType = {
  typeToggle: false,
  types: ["Web", "App", "Game"],
  selectedTypes: [],
};

export const selectTypeSlice = createSlice({
  name: "selectType",
  initialState,
  reducers: {
    // "프로젝트 종류" 토글을 클릭하였을 때
    clickTypeToggle: (state) => {
      state.typeToggle = !state.typeToggle;
    },
    setVisibilityTypeToggle: (state, action: PayloadAction<boolean>) => {
      state.typeToggle = action.payload;
    },
    // 프로젝트 종류를 선택하였을 때
    clickType: (state, action) => {
      const stack = action.payload;
      if (state.selectedTypes.includes(stack)) {
        state.selectedTypes = state.selectedTypes.filter(
          (item) => item !== stack
        );
      } else {
        state.selectedTypes = [...state.selectedTypes, stack];
      }
    },
    resetType: (state) => {
      state.selectedTypes = [];
    },
  },
});

export const {
  clickTypeToggle,
  setVisibilityTypeToggle,
  clickType,
  resetType,
} = selectTypeSlice.actions;

export default selectTypeSlice.reducer;
