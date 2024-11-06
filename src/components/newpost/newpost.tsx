import * as style from "./styles";
import SelectStackType from "../selectStackType/selectStackType";
import NewpostEditor from "./mdeditor";

export function NewpostName() {
  return (
    <style.NewpostNameInput
      type="text"
      placeholder="프로젝트 이름을 입력하세요"
    ></style.NewpostNameInput>
  );
}

export function NewpostOneline() {
  return (
    <style.NewpostOnelineInput
      type="text"
      placeholder="한 줄 소개글"
    ></style.NewpostOnelineInput>
  );
}

export default function NewpostComponents() {
  return (
    <style.NewpostContainer>
      <NewpostName />
      <SelectStackType />
      <NewpostOneline />
      <NewpostEditor />
    </style.NewpostContainer>
  );
}
