import * as Style from "./styles";
import SelectStack from "./selectStack";
import SelectType from "./selectType";
import SelectedStackType from "./selectedStackType";

export default function SelectStackType() {
  return (
    <div>
      <Style.SelectStackTypeContainer>
        <SelectStack />
        <SelectType />
      </Style.SelectStackTypeContainer>
      <SelectedStackType />
    </div>
  );
}
