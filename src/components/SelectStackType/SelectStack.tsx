import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useEffect, useState } from "react";
import useDebounce from "./debounce";
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

export default function SelectStack() {
  const [open, setOpen] = useState(false);

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
                    clickStack(stack);
                  }}
                >
                  {stack}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedStacks.includes(stack)
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
