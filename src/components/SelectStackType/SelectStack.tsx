import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import * as Style from "./styles";
import { useEffect } from "react";
import useDebounce from "./debounce";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SelectStack() {
  const {
    stacks,
    searchWord,
    searching,
    selectedStacks,

    updateSearchWord,
    inputStack,
    clickStack,
  } = useSelectStacks();

  const debouncedSearchStackWord = useDebounce(searchWord, 500);
  useEffect(() => {
    inputStack(debouncedSearchStackWord);
  }, [debouncedSearchStackWord, inputStack]);

  return (
    <Style.SelectStackTypeCard>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Style.SelectStackTypeBtn>기술 스택</Style.SelectStackTypeBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            width: "var(--radix-dropdown-menu-trigger-width)",
            border: "none",
            padding: 0,
            marginTop: 0,
            paddingTop: 10,
          }}
        >
          <Style.SelectStackTypeDropdown>
            <Style.SelectStackNameInput
              type="text"
              placeholder="검색"
              value={searchWord}
              onChange={(input) => {
                updateSearchWord(input.target.value);
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
        </DropdownMenuContent>
      </DropdownMenu>
    </Style.SelectStackTypeCard>
  );
}
