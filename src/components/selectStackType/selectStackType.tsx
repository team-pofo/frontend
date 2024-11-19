import * as Style from "./Styles";
import SelectStack from "./SelectStack";
import SelectType from "./SelectType";
import SelectedStackType from "./SelectedStackType";

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
