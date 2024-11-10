import * as Style from "./styles";
import SelectStackType from "../SelectStackType/selectStackType";
import NewpostEditor from "./mdeditor";
import { useEffect, useState } from "react";
import ImageUploadBtn from "./ImageUpload/imageUpload";

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

export function NewpostLink() {
  return (
    <Style.NewpostCard>
      <Style.NewpostText>참고 링크</Style.NewpostText>
      <div style={{ display: "flex", gap: "10px" }}>
        <Style.NewpostOnelineInput
          type="text"
          placeholder="링크 입력 (https://github.com)"
        ></Style.NewpostOnelineInput>
        <Style.NewpostLinkAddbtn>+</Style.NewpostLinkAddbtn>
      </div>
    </Style.NewpostCard>
  );
}

export function NewpostRepresentativeImg() {
  // const [imgSrc, setImgSrc] = useState<string[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (imgSrc.length >= 3) {
  //     alert("이미지는 최대 3개까지 등록 가능합니다");
  //   }
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   // 로딩이 완료되면 실행할 콜백 함수 등록
  //   fileReader.onload = (e) => {
  //     if (typeof e.target?.result === "string") {
  //       // setImgSrc(e.target?.result);
  //       setImgSrc((prevState) => [...prevState, e.target?.result as string]);
  //     }
  //   };
  // };

  return (
    <Style.NewpostCard>
      <Style.NewpostText>대표 이미지</Style.NewpostText>
      <ImageUploadBtn />

      {/* <input type="file" accept="image/*" onChange={handleChange}></input> */}
    </Style.NewpostCard>
  );
}

export default function NewpostComponents() {
  return (
    <Style.NewpostContainer>
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
