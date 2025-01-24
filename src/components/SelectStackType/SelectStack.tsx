import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import * as Style from "./styles";
import { useEffect, useState } from "react";
import useDebounce from "./debounce";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectStack22() {
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

export default function SelectStack() {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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

  const toggleValue = (currentValue: string) => {
    setSelectedValues(
      (prevValues) =>
        prevValues.includes(currentValue)
          ? prevValues.filter((value) => value !== currentValue) // Remove if already selected
          : [...prevValues, currentValue], // Add if not selected
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          style={{ height: "40px" }}
        >
          스택
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchWord}
            onInput={(event) => {
              updateSearchWord(event.currentTarget.value);
            }}
            placeholder="스택 검색"
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>검색결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {searching && stacks.length === 0 && (
                <p style={{ marginLeft: "10px" }}>검색 결과가 없습니다</p>
              )}
              {stacks.map((stack, index) => (
                <CommandItem
                  key={index}
                  value={stack}
                  onSelect={() => {
                    toggleValue(stack);
                    clickStack(stack);
                  }}
                >
                  {stack}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(stack)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
