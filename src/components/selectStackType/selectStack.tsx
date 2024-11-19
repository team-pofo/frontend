import { RootState, useAppDispatch } from "@/stores";
import { useSelector } from "react-redux";
import * as Style from "./styles";
import {
  clickStack,
  clickStackToggle,
  inputStack,
} from "@/stores/selectStackType/selectStacksReducer";
import { setVisibilityTypeToggle } from "@/stores/selectStackType/selectTypesReducer";
import useDebounce from "./debounce";
import { useEffect, useState } from "react";

export default function SelectStack() {
  const dispatch = useAppDispatch();
  const { stackToggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  const [searchStackWord, setSearchStackWrod] = useState("");
  const debouncedSearchStackWord = useDebounce(searchStackWord, 300);

  useEffect(() => {
    dispatch(inputStack(debouncedSearchStackWord));
  }, [debouncedSearchStackWord, dispatch]);

  return (
    <Style.SelectStackTypeCard>
      <Style.SelectStackTypeBtn
        onClick={() => {
          dispatch(clickStackToggle());
          dispatch(setVisibilityTypeToggle(false));
        }}
      >
        기술 스택
      </Style.SelectStackTypeBtn>

      {stackToggle && (
        <Style.SelectStackTypeDropdown>
          <Style.SelectStackNameInput
            type="text"
            placeholder="검색"
            onChange={(event) => {
              setSearchStackWrod(event.target.value);
              // dispatch(inputStack(debouncedSearchStackWord));
            }}
          ></Style.SelectStackNameInput>

          {stacks.map((stack, index) => (
            <div key={index}>
              <Style.SelectStackTypeLabel>
                <Style.SelectStackTypeCheckobx
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => dispatch(clickStack(stack))}
                ></Style.SelectStackTypeCheckobx>
                {stack}
              </Style.SelectStackTypeLabel>
            </div>
          ))}
        </Style.SelectStackTypeDropdown>
      )}
    </Style.SelectStackTypeCard>
  );
}
