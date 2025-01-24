import * as Style from "./styles";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SelectType22() {
  const { types, selectedTypes, clickType } = useSelectTypes();

  return (
    <Style.SelectStackTypeCard>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Style.SelectStackTypeBtn>카테고리</Style.SelectStackTypeBtn>
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
            {types.map((type, index) => (
              <div key={index}>
                <Style.SelectStackTypeLabel>
                  <Style.SelectStackTypeCheckobx
                    style={{ padding: "10px" }}
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => clickType(type)}
                  ></Style.SelectStackTypeCheckobx>
                  {type}
                </Style.SelectStackTypeLabel>
              </div>
            ))}
          </Style.SelectStackTypeDropdown>
        </DropdownMenuContent>
      </DropdownMenu>
    </Style.SelectStackTypeCard>
  );
}

import * as React from "react";
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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function SelectType() {
  const { types, selectedTypes, clickType } = useSelectTypes();
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

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
                    toggleValue(type);
                    clickType(type);
                  }}
                >
                  {type}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(type)
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
