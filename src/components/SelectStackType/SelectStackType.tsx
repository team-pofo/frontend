import * as Style from "./styles";
import SelectStack from "./SelectStack";
import SelectType from "./SelectType";
import SelectedStackType from "./SelectedStackType";
import { useEffect, useRef } from "react";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";

export default function SelectStackType() {
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
    <div ref={ref}>
      <Style.SelectStackTypeContainer>
        <SelectStack />
        <SelectType />
      </Style.SelectStackTypeContainer>
      <SelectedStackType />
    </div>
  );
}
