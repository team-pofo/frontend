import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import { Button } from "../ui/button";

export function SearchName() {
  return (
    <Styles.SearchCard>
      <Styles.SearchNameInput
        type="text"
        placeholder="프로젝트 이름"
      ></Styles.SearchNameInput>
    </Styles.SearchCard>
  );
}

export function SearchBtn() {
  return (
    <Button
      style={{
        height: "50px",
        width: "80px",
        fontSize: "20px",
      }}
    >
      검색
    </Button>
  );
}

export default function SearchCardContainer() {
  return (
    <Styles.SearchContainer>
      <Styles.SearchCardContainerName>
        <SearchName />
        <SearchBtn />
      </Styles.SearchCardContainerName>
      <SelectStackType />
    </Styles.SearchContainer>
  );
}
