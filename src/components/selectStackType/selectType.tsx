import { RootState, useAppDispatch } from "@/stores";
import { useSelector } from "react-redux";
import * as Style from "./styles";
import {
  clickType,
  clickTypeToggle,
} from "@/stores/selectStackType/selectTypesReducer";
import { setVisibilityStackToggle } from "@/stores/selectStackType/selectStacksReducer";

export default function SelectType() {
  const dispatch = useAppDispatch();
  const { typeToggle, types, selectedTypes } = useSelector(
    (state: RootState) => state.searchProjectType
  );
  return (
    <Style.SelectStackTypeCard>
      <Style.SelectStackTypeBtn onClick={() => {
        dispatch(clickTypeToggle());
        dispatch(setVisibilityStackToggle(false));
      }}>
        프로젝트 구분
      </Style.SelectStackTypeBtn>

      {typeToggle && (
        <Style.SelectStackTypeDropdown>
          {types.map((type, index) => (
            <div key={index}>
              <Style.SelectStackTypeLabel>
                <Style.SelectStackTypeCheckobx
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => dispatch(clickType(type))}
                ></Style.SelectStackTypeCheckobx>
                {type}
              </Style.SelectStackTypeLabel>
            </div>
          ))}
        </Style.SelectStackTypeDropdown>
      )}
    </Style.SelectStackTypeCard>
  );
}
