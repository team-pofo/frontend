import { RootState, useAppDispatch } from "@/stores";
import { useSelector } from "react-redux";
import * as Style from "@/styles/selectStackType/selectStackTypeStyle";
import {
  clickStack,
  clickStackToggle,
  inputStack,
} from "@/stores/selectStackType/selectStacksReducer";

export default function SelectStack() {
  const dispatch = useAppDispatch();
  const { stackToggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <Style.SelectStackTypeCard>
      <Style.SelectStackTypeBtn onClick={() => dispatch(clickStackToggle())}>
        기술 스택
      </Style.SelectStackTypeBtn>

      {stackToggle && (
        <Style.SelectStackTypeDropdown>
          <Style.SelectStackNameInput
            type="text"
            placeholder="검색"
            onChange={(input) => {
              dispatch(inputStack(input.target.value));
            }}
          ></Style.SelectStackNameInput>

          {stacks.map((stack, index) => (
            <div key={index}>
              <Style.SelectStackTypeLabel>
                <Style.SelectStackTypeCheckobx
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => dispatch(clickStack(stack))}
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
