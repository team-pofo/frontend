import * as Style from "./styles";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";

export default function SelectedStackType() {
  const { selectedStacks, clickStack, resetStack } = useSelectStacks();
  const { selectedTypes, clickType, resetType } = useSelectTypes();

  return (
    !(selectedStacks.length == 0 && selectedTypes.length == 0) && (
      <Style.SelectedStackTypeContainer>
        {selectedStacks.map((stack, index) => (
          <Style.SelectedStackCard key={index}>
            {stack}
            <button
              onClick={() => {
                clickStack(stack);
              }}
            >
              &times;
            </button>
          </Style.SelectedStackCard>
        ))}
        {selectedTypes.map((type, index) => (
          <Style.SelectedTypeCard key={index}>
            {type}
            <button
              onClick={() => {
                clickType(type);
              }}
            >
              &times;
            </button>
          </Style.SelectedTypeCard>
        ))}
        {!(selectedStacks.length == 0 && selectedTypes.length == 0) && (
          <Style.SelectedStackTypeResetBtn
            onClick={() => {
              resetStack();
              resetType();
            }}
          >
            초기화
          </Style.SelectedStackTypeResetBtn>
        )}
      </Style.SelectedStackTypeContainer>
    )
  );
}
