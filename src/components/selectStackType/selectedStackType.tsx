import { RootState, useAppDispatch } from "@/stores";
import { useSelector } from "react-redux";
import * as Style from "./styles";
import {
  clickStack,
  resetStack,
} from "@/stores/selectStackType/selectStacksReducer";
import {
  clickType,
  resetType,
} from "@/stores/selectStackType/selectTypesReducer";

export default function SelectedStackType() {
  const dispatch = useAppDispatch();
  // const { stackToggle, stacks, selectedStacks } = useSelector(
  //   (state: RootState) => state.searchProjectStack
  // );
  const { selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  const { selectedTypes } = useSelector(
    (state: RootState) => state.searchProjectType
  );
  return (
    !(selectedStacks.length == 0 && selectedTypes.length == 0) && (
      <Style.SelectedStackTypeContainer>
        {selectedStacks.map((stack, index) => (
          <Style.SelectedStackCard key={index}>
            {stack}
            <button
              onClick={() => {
                dispatch(clickStack(stack));
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
                dispatch(clickType(type));
              }}
            >
              &times;
            </button>
          </Style.SelectedTypeCard>
        ))}
        {!(selectedStacks.length == 0 && selectedTypes.length == 0) && (
          <Style.SelectedStackTypeResetBtn
            onClick={() => {
              dispatch(resetStack());
              dispatch(resetType());
            }}
          >
            초기화
          </Style.SelectedStackTypeResetBtn>
        )}
      </Style.SelectedStackTypeContainer>
    )
  );
}
