import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterSlice from "./counterSlice";
import searchProjectStackSlice from "./selectStackType/selectStacksReducer";
import searchProjectTypeSlice from "./selectStackType/selectTypesReducer";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    searchProjectStack: searchProjectStackSlice,
    searchProjectType: searchProjectTypeSlice,
  },
});

// 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom Hook: useDispatch에 타입을 지정
export const useAppDispatch = () => useDispatch<AppDispatch>();
