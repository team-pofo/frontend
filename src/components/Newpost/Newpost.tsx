import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import NewpostEditor from "./MDEditor/MdeditorWriter";
import NewpostImages from "./ImageUpload/ImageUpload";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import { Button } from "../ui/button";
import { CREATE_PROJECT } from "@/services/gql/createProjectById";
import { useMutation } from "@apollo/client";

// 프로젝트 이름
function NewpostName() {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostNameInput
        type="text"
        placeholder="프로젝트 이름을 입력하세요"
      ></Styles.NewpostNameInput>
    </Styles.NewpostCard>
  );
}

// 한 줄 소개글
function NewpostOneline() {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostText>한 줄 소개글</Styles.NewpostText>
      <Styles.NewpostOnelineInput
        type="text"
        placeholder="한 줄 소개글"
      ></Styles.NewpostOnelineInput>
    </Styles.NewpostCard>
  );
}

// 참고 링크
function NewpostLink() {
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
    <Styles.NewpostCard>
      <Styles.NewpostText>참고 링크</Styles.NewpostText>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {links.map((link, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <Styles.NewpostOnelineInput
              type="text"
              value={link}
              placeholder="링크 입력 (https://github.com)"
              onChange={(e) => {
                const newLinks = [...links];
                newLinks[index] = e.target.value;
                setLinks(newLinks);
              }}
            ></Styles.NewpostOnelineInput>
            {index === 0 ? (
              <Styles.NewpostLinkBtn
                onClick={() => {
                  addLink();
                }}
              >
                <FaPlus />
              </Styles.NewpostLinkBtn>
            ) : (
              <Styles.NewpostLinkBtn
                onClick={() => {
                  minusLink(index);
                }}
              >
                <FaMinus />
              </Styles.NewpostLinkBtn>
            )}
          </div>
        ))}
      </div>
    </Styles.NewpostCard>
  );
}

function NewpostRepresentativeImg() {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostText>대표 이미지</Styles.NewpostText>
      <NewpostImages />
    </Styles.NewpostCard>
  );
}
function CreateProjectButton() {
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  if (loading) return "Submitting...";
  if (error) {
    console.log(error.message);
    return `Submission error! ${error.message}`;
  }

  console.log(data);

  return (
    <Button
      style={{ fontSize: "20px", padding: "20px" }}
      onClick={() =>
        createProject({
          variables: { title: "123" },
        })
      }
    >
      프로젝트 등록
    </Button>
  );
}

export default function NewpostComponents() {
  return (
    <Styles.NewpostContainer>
      <NewpostName />
      <Styles.NewpostText>기술 스택 및 프로젝트 구분</Styles.NewpostText>
      <SelectStackType />
      <NewpostOneline />
      <NewpostLink />
      <Styles.NewpostCard>
        <Styles.NewpostText>프로젝트 소개</Styles.NewpostText>
        <NewpostEditor />
      </Styles.NewpostCard>
      <NewpostRepresentativeImg />
      <CreateProjectButton />
    </Styles.NewpostContainer>
  );
}
