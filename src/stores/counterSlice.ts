import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

// Selector: counter 상태를 가져오는 함수
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
