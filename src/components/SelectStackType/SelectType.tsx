import * as Style from "./styles";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";

export default function SelectType() {
  const { typeToggle, types, selectedTypes, clickTypeToggle, clickType } =
    useSelectTypes();
  const { setVisibilityStackToggle } = useSelectStacks();

  return (
    <Style.SelectStackTypeCard>
      <Style.SelectStackTypeBtn
        onClick={() => {
          clickTypeToggle();
          setVisibilityStackToggle(false);
        }}
      >
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
                  onChange={() => clickType(type)}
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
