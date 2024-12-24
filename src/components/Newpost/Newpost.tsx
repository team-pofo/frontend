import * as Style from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import NewpostEditor from "./MDEditor/MdeditorWriter";
import { useEffect, useRef, useState } from "react";
import NewpostImages from "./ImageUpload/ImageUpload";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import { FaPlus, FaMinus } from "react-icons/fa";

// 프로젝트 이름
export function NewpostName() {
  return (
    <Style.NewpostCard>
      <Style.NewpostNameInput
        type="text"
        placeholder="프로젝트 이름을 입력하세요"
      ></Style.NewpostNameInput>
    </Style.NewpostCard>
  );
}

// 한 줄 소개글
export function NewpostOneline() {
  return (
    <Style.NewpostCard>
      <Style.NewpostText>한 줄 소개글</Style.NewpostText>
      <Style.NewpostOnelineInput
        type="text"
        placeholder="한 줄 소개글"
      ></Style.NewpostOnelineInput>
    </Style.NewpostCard>
  );
}

// 참고 링크
export function NewpostLink() {
  const [links, setLinks] = useState<string[]>([""]);

  const addLink = () => {
    if (links.length >= 3) {
      alert("링크는 최대 3개까지 등록 가능합니다");
      return;
    }
    setLinks((previous) => [...previous, ""]);
  };
  const minusLink = (trg: number) => {
    setLinks((previous) => previous.filter((_, idx) => idx !== trg));
  };

  return (
    <Style.NewpostCard>
      <Style.NewpostText>참고 링크</Style.NewpostText>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((link, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <Style.NewpostOnelineInput
              type="text"
              value={link}
              placeholder="링크 입력 (https://github.com)"
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
            ></Style.NewpostOnelineInput>
            {index === 0 ? (
              <Style.NewpostLinkBtn
                onClick={() => {
                  addLink();
                }}
              >
                <FaPlus />
              </Style.NewpostLinkBtn>
            ) : (
              <Style.NewpostLinkBtn
                onClick={() => {
                  minusLink(index);
                }}
              >
                <FaMinus />
              </Style.NewpostLinkBtn>
            )}
          </div>
        ))}
      </div>
    </Style.NewpostCard>
  );
}

export function NewpostRepresentativeImg() {
  return (
    <Style.NewpostCard>
      <Style.NewpostText>대표 이미지</Style.NewpostText>
      <NewpostImages />
    </Style.NewpostCard>
  );
}

export default function NewpostComponents() {
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
    <Style.NewpostContainer ref={ref}>
      <NewpostName />
      <Style.NewpostText>기술 스택 및 프로젝트 구분</Style.NewpostText>
      <SelectStackType />
      <NewpostOneline />
      <NewpostLink />
      <Style.NewpostCard>
        <Style.NewpostText>프로젝트 소개</Style.NewpostText>
        <NewpostEditor />
      </Style.NewpostCard>
      <NewpostRepresentativeImg />
    </Style.NewpostContainer>
  );
}
