import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import * as Style from "./styles";

export default function SelectStack() {
  const {
    stackToggle,
    stacks,
    selectedStacks,
    clickStackToggle,
    inputStack,
    clickStack,
  } = useSelectStacks();
  const { setVisibilityTypeToggle } = useSelectTypes();
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
              inputStack(input.target.value);
            }}
          ></Style.SelectStackNameInput>

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
