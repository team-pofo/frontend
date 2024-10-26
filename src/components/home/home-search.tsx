"use client";
import * as style from "@/styles/homeSearchStyle";
import { RootState, useAppDispatch } from "@/stores";
import {
  clickToggle,
  inputStack,
  clickStack,
} from "@/stores/search_project/searchProjectStackReducer";
import { useState } from "react";
import { useSelector } from "react-redux";

export function SearchName() {
  return (
    <style.SearchWrapper>
      <style.SearchNameInput
        type="text"
        placeholder="프로젝트 이름"
      ></style.SearchNameInput>
    </style.SearchWrapper>
  );
}

export function SearchStack() {
  const dispatch = useAppDispatch();
  const { toggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <style.SearchWrapper>
      <style.SearchStackBtn onClick={() => dispatch(clickToggle())}>
        기술 스택
      </style.SearchStackBtn>

      {toggle && (
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
    </style.SearchWrapper>
  );
}

export function SearchTypes({ items }: { items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <style.SearchWrapper>
      <style.SearchStackBtn onClick={toggleDropdown}>
        프로젝트 구분
      </style.SearchStackBtn>

      {isOpen && (
        <style.SearchStackDropdown>
          {items.map((option, index) => (
            <div key={index}>
              <style.SearchDropdownLabel>
                <style.SearchCheckbox
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                ></style.SearchCheckbox>
                {option}
              </style.SearchDropdownLabel>
            </div>
          ))}
        </style.SearchStackDropdown>
      )}
    </style.SearchWrapper>
  );
}

export function SelectedStacks() {
  const { toggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <div>
      {selectedStacks.map((stack, index) => (
        <h1>{stack}</h1>
      ))}
    </div>
  );
}

export default function SearchWrapperWrapper() {
  const types = ["Web", "App", "Game"];
  return (
    <div>
      <style.SearchWrapperContainer>
        <SearchName />
        <SearchStack />
        {/* <SearchStacks items={stacks} /> */}
        <SearchTypes items={types} />
      </style.SearchWrapperContainer>
      <SelectedStacks />
    </div>
  );
}
