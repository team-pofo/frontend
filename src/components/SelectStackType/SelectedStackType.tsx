import * as Style from "./styles";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";

export default function SelectedStackType() {
  const { selectedStacks, clickStack, resetStack } = useSelectStacks();
  const { selectedTypes, clickType, resetType } = useSelectTypes();

  return (
    !(selectedStacks.length == 0 && selectedTypes.length == 0) && (
      <Style.SelectedStackTypeContainer>
        {selectedStacks.map((stack, index) => (
          <Badge
            style={{ gap: "8px", height: "28px" }}
            variant="secondary"
            key={index}
          >
            {stack}
            <button
              onClick={() => {
                clickStack(stack);
              }}
            >
              <IoClose size={16} />
            </button>
          </Badge>
        ))}
        {selectedTypes.map((type, index) => (
          <Badge
            style={{ gap: "8px", height: "28px" }}
            variant="secondary"
            key={index}
          >
            {type}
            <button
              onClick={() => {
                clickType(type);
              }}
            >
              <IoClose />
            </button>
          </Badge>
        ))}
        {!(selectedStacks.length == 0 && selectedTypes.length == 0) && (
          <Badge
            style={{ height: "28px", cursor: "pointer" }}
            onClick={() => {
              resetStack();
              resetType();
            }}
          >
            초기화
          </Badge>
        )}
      </Style.SelectedStackTypeContainer>
    )
  );
}
