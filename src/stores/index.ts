import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import counterSlice from "./counterSlice";
import searchProjectStackSlice from "./search_project/searchProjectStacksReducer";
import searchProjectTypeSlice from "./search_project/searchProjectTypesReducer";

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
