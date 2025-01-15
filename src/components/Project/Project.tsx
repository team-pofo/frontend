import { useRouter } from "next/router";
import * as Styles from "./styles";
import MDEditorViewer from "./MDEditor/MdeditorViewer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_BY_ID } from "@/services/gql/getProjectDetailById";
import { IProject, IProjectProps } from "@/lib/interface/iProject";
import { useAuthStore } from "@/stores/authStore";

import { FaHeart, FaShare, FaEdit } from "react-icons/fa";

function ProjectTittle({ project }: IProjectProps) {
  return <Styles.ProjectDetailTitle>{project.title}</Styles.ProjectDetailTitle>;
}

function ProjectStacksTypes({ project }: IProjectProps) {
  const stackList = project.stacks;
  const categoryList = project.categories;
  return (
    <Styles.StackTypeContainer>
      {stackList === undefined
        ? null
        : stackList.map((stack, index) => (
            <Styles.StackCard key={index}> {stack}</Styles.StackCard>
          ))}
      {categoryList === undefined
        ? null
        : categoryList.map((category, index) => (
            <Styles.TypeCard key={index}> {category}</Styles.TypeCard>
          ))}
    </Styles.StackTypeContainer>
  );
}

function ProjectIntroduction({ project }: IProjectProps) {
  return (
    <div>
      <Styles.ProjectDetailIntroduction>
        {project.bio}
      </Styles.ProjectDetailIntroduction>
    </div>
  );
}

function ProjectLikeShare({ project }: IProjectProps) {
  const { user } = useAuthStore();

  return (
    <div>
      <div
        style={{
          marginTop: "20px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          border: "solid 2px black",
          borderRadius: "20px",
          padding: "5px 15px 5px 15px",
          gap: "15px",
        }}
      >
        <button>
          <FaHeart style={{ width: "26px", height: "26px" }} />
        </button>
        <button>
          <FaShare style={{ width: "26px", height: "26px" }} />
        </button>
        {user?.data?.email === project.authorName ? (
          <Link style={{ width: "100%" }} href={`/project/edit/${project.id}`}>
            <FaEdit style={{ width: "26px", height: "26px" }} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function ProjectRepresentativeImages({ project }: IProjectProps) {
  const imgList: string[] = project.imageUrls;

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImagePreview = (src: string) => {
    setSelectedImage(src);
    setShowModal(true);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const ImageWide = ({
    src,
    onClose,
  }: {
    src: string;
    onClose: () => void;
  }) => (
    <Styles.ModalOverlay onClick={onClose}>
      <Styles.ModalImage src={src} alt="" />
    </Styles.ModalOverlay>
  );

  return (
    <Styles.ProjectDetailRepresentativeImageContainer>
      {imgList === null
        ? null
        : imgList.map((img, index) => (
            <Styles.ImagePreview key={index}>
              <Image
                src={img}
                onClick={() => {
                  openImagePreview(img);
                }}
                alt=""
                layout="fill"
              />
              {showModal && selectedImage && (
                <ImageWide src={selectedImage} onClose={closeImagePreview} />
              )}
            </Styles.ImagePreview>
          ))}
    </Styles.ProjectDetailRepresentativeImageContainer>
  );
}

function ProjectLinks({ project }: IProjectProps) {
  const linkList: string[] = project.urls;
  return (
    <div>
      {linkList === null
        ? null
        : linkList.map((link, index) => (
            <Link key={index} href={link} legacyBehavior>
              <Styles.ProjectDetailLink target="_blank">
                링크 {index + 1}:{" "}
                <span style={{ textDecoration: "underline" }}>{link}</span>
                <br />
              </Styles.ProjectDetailLink>
            </Link>
          ))}
    </div>
  );
}

export default function ProjectComponents() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId: parseInt(id as string) },
    fetchPolicy: "no-cache",
  });

  if (loading) return;
  if (error)
    return <p style={{ margin: "20px 20px" }}>Error: {error.message}</p>;
  const project: IProject = data?.projectById;

  return (
    <Styles.ProjectDetailContainer>
      <ProjectStacksTypes project={project} />
      <ProjectTittle project={project} />
      <ProjectIntroduction project={project} />
      <ProjectRepresentativeImages project={project} />
      <ProjectLinks project={project} />
      <MDEditorViewer project={project} />
      <ProjectLikeShare project={project} />
    </Styles.ProjectDetailContainer>
  );
}
