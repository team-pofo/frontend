import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import * as Style from "./styles";
import { useEffect, useState } from "react";
import useDebounce from "./debounce";

export default function SelectStack() {
  const {
    stackToggle,
    stacks,
    searching,
    selectedStacks,
    clickStackToggle,
    inputStack,
    clickStack,
  } = useSelectStacks();
  const { setVisibilityTypeToggle } = useSelectTypes();

  const [searchStackWord, setSearchStackWord] = useState("");
  const debouncedSearchStackWord = useDebounce(searchStackWord, 550);
  useEffect(() => {
    inputStack(debouncedSearchStackWord);
  }, [debouncedSearchStackWord, inputStack]);

  return (
    <Style.SelectStackTypeCard>
      <Style.SelectStackTypeBtn
        onClick={() => {
          clickStackToggle();
          setVisibilityTypeToggle(false);
        }}
      >
        기술 스택
      </Style.SelectStackTypeBtn>

      {stackToggle && (
        <Style.SelectStackTypeDropdown>
          <Style.SelectStackNameInput
            type="text"
            placeholder="검색"
            onChange={(input) => {
              setSearchStackWord(input.target.value);
            }}
          ></Style.SelectStackNameInput>

          {searching && stacks.length === 0 && (
            <p style={{ marginLeft: "10px" }}>검색 결과가 없습니다</p>
          )}
          {!searching && (
            <p style={{ marginLeft: "10px" }}>검색어를 입력해주세요</p>
          )}

          {stacks.map((stack, index) => (
            <div key={index}>
              <Style.SelectStackTypeLabel>
                <Style.SelectStackTypeCheckobx
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => clickStack(stack)}
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
