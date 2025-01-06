import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import { Button } from "../ui/button";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROJECT } from "@/services/gql/searchProject";

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
  const [getData] = useLazyQuery(SEARCH_PROJECT, {
    onCompleted: (fetchedData) => {
      console.log(fetchedData);
      console.log(fetchedData.searchProject.projects);
    },
  });
  const handleFetchData = () => {
    getData(); // 쿼리 실행
  };

  return (
    // shadcn
    <Button
      style={{
        height: "50px",
        width: "80px",
        fontSize: "20px",
      }}
      onClick={() => {
        handleFetchData();
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
