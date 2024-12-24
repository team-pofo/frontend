import * as style from "./styles";
import { useEffect, useRef } from "react";
import SelectStackType from "../SelectStackType/SelectStackType";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";

export function SearchName() {
  return (
    <style.SearchCard>
      <style.SearchNameInput
        type="text"
        placeholder="프로젝트 이름"
      ></style.SearchNameInput>
    </style.SearchCard>
  );
}

export function SearchBtn() {
  return <style.SearchBtn>검색</style.SearchBtn>;
}

export default function SearchCardContainer() {
  const ref = useRef<HTMLDivElement | null>(null);

  const { setVisibilityStackToggle } = useSelectStacks();
  const { setVisibilityTypeToggle } = useSelectTypes();

  // 화면 바깥 클릭 시 상태 업데이트
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setVisibilityStackToggle(false);
      setVisibilityTypeToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <style.SearchContainer ref={ref}>
      <style.SearchCardContainerName>
        <SearchName />
        <SearchBtn />
      </style.SearchCardContainerName>

      <SelectStackType />
    </style.SearchContainer>
  );
}
