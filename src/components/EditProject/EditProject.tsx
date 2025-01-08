import * as Styles from "./styles";
import SelectStackType from "../SelectStackType/SelectStackType";
import NewpostEditor from "./MDEditor/MdeditorWriter";
import NewpostImages from "./ImageUpload/ImageUpload";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Button } from "../ui/button";
import { CREATE_PROJECT } from "@/services/gql/createProject";
import { useMutation, useQuery } from "@apollo/client";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import {
  ProjectCategory,
  getCategoryKey,
} from "@/libs/enum/projectCategoryEnum";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useEditProject } from "@/stores/editProjectStore";
import { GET_PROJECT_BY_ID } from "@/services/gql/getProjectDetailById";

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
    <Styles.EditProjectCard>
      <Styles.EditProjectNameInput
        type="text"
        placeholder="프로젝트 이름을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Styles.EditProjectNameInput>
    </Styles.EditProjectCard>
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
    <Styles.EditProjectCard>
      <Styles.EditProjectText>한 줄 소개글</Styles.EditProjectText>
      <Styles.EditProjectOnelineInput
        type="text"
        placeholder="한 줄 소개글"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      ></Styles.EditProjectOnelineInput>
    </Styles.EditProjectCard>
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
    <Styles.EditProjectCard>
      <Styles.EditProjectText>참고 링크</Styles.EditProjectText>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {urls.map((url, index) => (
          <div key={index} style={{ display: "flex", gap: "10px" }}>
            <Styles.EditProjectOnelineInput
              type="text"
              value={url}
              placeholder="링크 입력 (https://github.com)"
              onChange={(e) => {
                const newLinks = [...urls];
                newLinks[index] = e.target.value;
                setUrls(newLinks);
              }}
            ></Styles.EditProjectOnelineInput>
            {index === 0 ? (
              <Styles.EditProjectLinkBtn
                onClick={() => {
                  addLink();
                }}
              >
                <FaPlus />
              </Styles.EditProjectLinkBtn>
            ) : (
              <Styles.EditProjectLinkBtn
                onClick={() => {
                  minusLink(index);
                }}
              >
                <FaMinus />
              </Styles.EditProjectLinkBtn>
            )}
          </div>
        ))}
      </div>
    </Styles.EditProjectCard>
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
    <Styles.EditProjectCard>
      <Styles.EditProjectText>대표 이미지</Styles.EditProjectText>
      <NewpostImages imageUrls={imageUrls} setImageUrls={setImageUrls} />
    </Styles.EditProjectCard>
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
  } = useEditProject();
  const {
    stackToggle,
    selectedStacks,
    clickStackToggle,
    clickStack,
    resetStack,
  } = useSelectStacks();
  const { typeToggle, selectedTypes, clickTypeToggle, clickType, resetType } =
    useSelectTypes();

  useEffect(() => {
    if (stackToggle) {
      clickStackToggle();
    }
    resetStack();
    if (typeToggle) {
      clickTypeToggle();
    }
    resetType();
  }, [resetStack, resetType]);

  const router = useRouter();
  const { id } = router.query;

  const { loading, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId: parseInt(id as string) },
    onCompleted: (fetchedData) => {
      const project = fetchedData.projectById;
      console.log(project);
      setTitle(project.title);
      console.log(project.bio);
      setBio(project.bio);
      setContent(project.content);
      setImageUrls(project.imageUrls);
      if (project.urls.length > 0) {
        setUrls(project.urls);
      }

      if (project.stacks !== undefined) {
        project.stacks.array.forEach((stack: string) => {
          clickStack(stack);
        });
      }
      if (project.categories !== undefined) {
        project.categories.array.forEach((category: ProjectCategory) => {
          clickType(category);
        });
      }
    },
  });

  if (loading) return;
  if (error)
    return <p style={{ margin: "20px 20px" }}>Error: {error.message}</p>;

  return (
    <Styles.EditProjectContainer>
      <NewpostName title={title} setTitle={setTitle} />
      <Styles.EditProjectText>
        기술 스택 및 프로젝트 구분
      </Styles.EditProjectText>
      <SelectStackType />
      <NewpostOneline bio={bio} setBio={setBio} />
      <NewpostUrls urls={urls} setUrls={setUrls} />
      <Styles.EditProjectCard>
        <Styles.EditProjectText>프로젝트 소개</Styles.EditProjectText>
        <NewpostEditor content={content} setContent={setContent} />
      </Styles.EditProjectCard>
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
    </Styles.EditProjectContainer>
  );
}
