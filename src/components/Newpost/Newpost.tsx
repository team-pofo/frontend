import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import NewpostEditor from "./MDEditor/MdeditorWriter";
import NewpostImages from "./ImageUpload/ImageUpload";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button } from "../ui/button";
import { CREATE_PROJECT } from "@/services/gql/createProject";
import { useMutation } from "@apollo/client";
import { useCreateProject } from "@/stores/createProjectStore";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import {
  ProjectCategory,
  getCategoryKey,
} from "@/libs/enum/projectCategoryEnum";
import { useRouter } from "next/router";

interface NewpostProps {
  title: string;
  bio: string;
  urls: string[];
  imageUrls: string[];
  content: string;
  categories: ProjectCategory[];
  stackNames: string[];
}

// 프로젝트 이름
function NewpostName({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (title: string) => void;
}) {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostNameInput
        type="text"
        placeholder="프로젝트 이름을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Styles.NewpostNameInput>
    </Styles.NewpostCard>
  );
}

// 한 줄 소개글
function NewpostOneline({
  bio,
  setBio,
}: {
  bio: string;
  setBio: (bio: string) => void;
}) {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostText>한 줄 소개글</Styles.NewpostText>
      <Styles.NewpostOnelineInput
        type="text"
        placeholder="한 줄 소개글"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></Styles.NewpostOnelineInput>
    </Styles.NewpostCard>
  );
}

// 참고 링크
function NewpostUrls({
  urls,
  setUrls,
}: {
  urls: string[];
  setUrls: (urls: string[]) => void;
}) {
  const addLink = () => {
    if (urls.length >= 3) {
      alert("링크는 최대 3개까지 등록 가능합니다");
      return;
    }
    setUrls([...urls, ""]);
  };
  const minusLink = (trg: number) => {
    setUrls(urls.filter((_, idx) => idx !== trg));
  };

  return (
    <Styles.NewpostCard>
      <Styles.NewpostText>참고 링크</Styles.NewpostText>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {urls.map((url, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <Styles.NewpostOnelineInput
              type="text"
              value={url}
              placeholder="링크 입력 (https://github.com)"
              onChange={(e) => {
                const newLinks = [...urls];
                newLinks[index] = e.target.value;
                setUrls(newLinks);
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

function NewpostRepresentativeImg({
  imageUrls,
  setImageUrls,
}: {
  imageUrls: string[];
  setImageUrls: (imageUrls: string[]) => void;
}) {
  return (
    <Styles.NewpostCard>
      <Styles.NewpostText>대표 이미지</Styles.NewpostText>
      <NewpostImages imageUrls={imageUrls} setImageUrls={setImageUrls} />
    </Styles.NewpostCard>
  );
}

function CreateProjectButton({
  title,
  bio,
  urls,
  imageUrls,
  content,
  categories,
  stackNames,
}: NewpostProps) {
  const categoryKeys = categories.map((category) => getCategoryKey(category));
  const [createProject] = useMutation(CREATE_PROJECT);
  const router = useRouter();

  return (
    <Button
      style={{ fontSize: "20px", padding: "20px" }}
      onClick={async () => {
        try {
          const response = await createProject({
            variables: {
              title,
              bio,
              urls,
              imageUrls,
              content,
              categories: categoryKeys,
              stackNames,
            },
          });

          if (response && response.data) {
            const projectData = response.data.createProject;
            alert("프로젝트 등록이 완료되었습니다!");
            console.log(projectData);
            router.push(`/project/${projectData.id}`);
          }
        } catch (err) {
          alert(err);
        }
      }}
    >
      프로젝트 등록
    </Button>
  );
}

export default function NewpostComponents() {
  const {
    title,
    bio,
    urls,
    imageUrls,
    content,

    setTitle,
    setBio,
    setUrls,
    setContent,
    setImageUrls,
  } = useCreateProject();
  const { selectedStacks } = useSelectStacks();
  const { selectedTypes } = useSelectTypes();

  return (
    <Styles.NewpostContainer>
      <NewpostName title={title} setTitle={setTitle} />
      <Styles.NewpostText>기술 스택 및 프로젝트 구분</Styles.NewpostText>
      <SelectStackType />
      <NewpostOneline bio={bio} setBio={setBio} />
      <NewpostUrls urls={urls} setUrls={setUrls} />
      <Styles.NewpostCard>
        <Styles.NewpostText>프로젝트 소개</Styles.NewpostText>
        <NewpostEditor content={content} setContent={setContent} />
      </Styles.NewpostCard>
      <NewpostRepresentativeImg
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
      />
      <CreateProjectButton
        title={title}
        bio={bio}
        urls={urls}
        imageUrls={imageUrls}
        content={content}
        categories={selectedTypes}
        stackNames={selectedStacks}
      />
    </Styles.NewpostContainer>
  );
}
