import * as Style from "./styles";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SelectType() {
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
