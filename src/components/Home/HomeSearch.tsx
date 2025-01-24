import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import { Button } from "../ui/button";
import { useSearchProject } from "@/stores/searchProjectStore";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface handleSearchProjectProps {
  handleSearchProject: () => void;
}

function SearchName() {
  const { title, setTitle } = useSearchProject();
  return (
    <Styles.SearchCard>
      <Input
        type="text"
        value={title}
        placeholder="프로젝트 이름"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        style={{ height: "50px", fontSize: "16px" }}
      ></Input>
    </Styles.SearchCard>
  );
}

function SearchBtn(handleSearchProject: handleSearchProjectProps) {
  return (
    // shadcn
    <Button
      style={{
        height: "50px",
        width: "80px",
      }}
      onClick={() => {
        handleSearchProject.handleSearchProject();
      }}
    >
      <Search size={64} />
    </Button>
  );
}

export default function SearchCardContainer({
  handleSearchProject,
}: handleSearchProjectProps) {
  return (
    <Styles.SearchFixedContainer>
      <Styles.SearchContainer>
        <Styles.SearchCardContainerName>
          <SearchName />
          <SearchBtn handleSearchProject={handleSearchProject} />
        </Styles.SearchCardContainerName>
        <SelectStackType />
      </Styles.SearchContainer>
    </Styles.SearchFixedContainer>
  );
}
