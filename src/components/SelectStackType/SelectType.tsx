import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";

export default function SelectType() {
  const { types, selectedTypes, clickType } = useSelectTypes();
  const [open, setOpen] = useState(false);

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
          {/* {selectedValues.length > 0
            ? selectedValues
                .map(
                  (value) =>
                    frameworks.find((framework) => framework.value === value)
                      ?.label,
                )
                .join(", ")
            : "Select frameworks..."} */}
          카테고리
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="카테고리 검색" className="h-9" />
          <CommandList>
            <CommandEmpty>검색결과가 없습니다.</CommandEmpty>
            <CommandGroup>
              {types.map((type, index) => (
                <CommandItem
                  key={index}
                  value={type}
                  onSelect={() => {
                    clickType(type);
                  }}
                >
                  {type}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedTypes.includes(type)
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
