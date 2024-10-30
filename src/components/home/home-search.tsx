"use client";
import * as style from "./styles";
import { RootState, useAppDispatch } from "@/stores";
import {
  clickStackToggle,
  setVisibilityStackToggle,
  inputStack,
  clickStack,
  resetStack,
} from "@/stores/search_project/searchProjectStacksReducer";
import {
  clickTypeToggle,
  setVisibilityTypeToggle,
  clickType,
  resetType,
} from "@/stores/search_project/searchProjectTypesReducer";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

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

export function SearchStack() {
  const dispatch = useAppDispatch();
  const { stackToggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <style.SearchCard>
      <style.SearchStackBtn onClick={() => dispatch(clickStackToggle())}>
        기술 스택
      </style.SearchStackBtn>

      {stackToggle && (
        <style.SearchStackDropdown>
          <style.SearchStackNameInput
            type="text"
            placeholder="검색"
            onChange={(input) => {
              dispatch(inputStack(input.target.value));
            }}
          ></style.SearchStackNameInput>

          {stacks.map((stack, index) => (
            <div key={index}>
              <style.SearchDropdownLabel>
                <style.SearchCheckbox
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => dispatch(clickStack(stack))}
                ></style.SearchCheckbox>
                {stack}
              </style.SearchDropdownLabel>
            </div>
          ))}
        </style.SearchStackDropdown>
      )}
    </style.SearchCard>
  );
}

export function SearchTypes() {
  const dispatch = useAppDispatch();
  const { typeToggle, types, selectedTypes } = useSelector(
    (state: RootState) => state.searchProjectType
  );
  return (
    <style.SearchCard>
      <style.SearchStackBtn onClick={() => dispatch(clickTypeToggle())}>
        프로젝트 구분
      </style.SearchStackBtn>

      {typeToggle && (
        <style.SearchStackDropdown>
          {types.map((type, index) => (
            <div key={index}>
              <style.SearchDropdownLabel>
                <style.SearchCheckbox
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => dispatch(clickType(type))}
                ></style.SearchCheckbox>
                {type}
              </style.SearchDropdownLabel>
            </div>
          ))}
        </style.SearchStackDropdown>
      )}
    </style.SearchCard>
  );
}

export function SelectedStacks() {
  const dispatch = useAppDispatch();
  const { stackToggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  const { typeToggle, types, selectedTypes } = useSelector(
    (state: RootState) => state.searchProjectType
  );
  return (
    <style.SearchSelectedStackContainer>
      {selectedStacks.map((stack, index) => (
        <style.SearchSelectedStackCard>
          {stack}
          <button
            onClick={() => {
              dispatch(clickStack(stack));
            }}
          >
            &times;
          </button>
        </style.SearchSelectedStackCard>
      ))}
      {selectedTypes.map((type, index) => (
        <style.SearchSelectedTypesCard>
          {type}
          <button
            onClick={() => {
              dispatch(clickType(type));
            }}
          >
            &times;
          </button>
        </style.SearchSelectedTypesCard>
      ))}
      {!(selectedStacks.length == 0 && selectedTypes.length == 0) && (
        <style.SearchResetBtn
          onClick={() => {
            dispatch(resetStack());
            dispatch(resetType());
          }}
        >
          초기화
        </style.SearchResetBtn>
      )}
    </style.SearchSelectedStackContainer>
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
      <style.SearchCardContainer1>
        <SearchName />
        <SearchBtn />
      </style.SearchCardContainer1>
      <style.SearchCardContainer2>
        <SearchStack />
        <SearchTypes />
      </style.SearchCardContainer2>
      <SelectedStacks />
    </style.SearchContainer>
  );
}
