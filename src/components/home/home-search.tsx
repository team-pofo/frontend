"use client";
import * as style from "@/styles/homeSearchStyle";
import { RootState, useAppDispatch } from "@/stores";
import {
  clickStackToggle,
  setVisibilityStackToggle,
  inputStack,
  clickStack,
  resetStack,
} from "@/stores/selectStackType/selectStacksReducer";
import {
  clickTypeToggle,
  setVisibilityTypeToggle,
  clickType,
  resetType,
} from "@/stores/selectStackType/selectTypesReducer";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import SelectStackType from "../selectStackType/selectStackType";

export function SearchName() {
  return (
    <style.SearchCard>
      <style.SearchNameInput
        type="text"
        placeholder="프로젝트 이름"
      ></style.SearchNameInput>
    </style.SearchCard>
  );
}

export function SearchBtn() {
  return <style.SearchBtn>검색</style.SearchBtn>;
}

export default function SearchCardContainer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  // 화면 바깥 클릭 시 상태 업데이트
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      dispatch(setVisibilityStackToggle(false));
      dispatch(setVisibilityTypeToggle(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <style.SearchContainer ref={ref}>
      <style.SearchCardContainerName>
        <SearchName />
        <SearchBtn />
      </style.SearchCardContainerName>
      <SelectStackType />
    </style.SearchContainer>
  );
}
