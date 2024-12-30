import { useRouter } from "next/router";
import * as Styles from "./styles";
import MDEditorViewer from "./MDEditor/MdeditorViewer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface Project {
  id: string;
  bio: string;
  category: string;
  content: string;
  imageUrls: string[];
  title: string;
  urls: string[];
}

interface ProjectProps {
  project: Project;
}

export const getProjectById = gql`
  query ProjectById($projectId: ID!) {
    projectById(projectId: $projectId) {
      id
      title
      bio
      urls
      imageUrls
      content
      isApproved
      category
    }
  }
`;

function ProjectTittle({ project }: ProjectProps) {
  return <Styles.ProjectDetailTitle>{project.title}</Styles.ProjectDetailTitle>;
}

function ProjectIntroduction({ project }: ProjectProps) {
  return (
    <div>
      <Styles.ProjectDetailIntroduction>
        {project.bio}
      </Styles.ProjectDetailIntroduction>
    </div>
  );
}

function ProjectRepresentativeImages({ project }: ProjectProps) {
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
      {imgList.map((img, index) => (
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

function ProjectLinks({ project }: ProjectProps) {
  const linkList: string[] = project.urls;
  return (
    <div>
      {linkList.map((link, index) => (
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

  const { data, loading, error } = useQuery(getProjectById, {
    variables: { projectId: parseInt(id as string) },
  });

  if (loading) return;
  if (error)
    return <p style={{ margin: "20px 20px" }}>Error: {error.message}</p>;

  const project: Project = data?.projectById;
  return (
    <Styles.ProjectDetailContainer>
      <ProjectTittle project={project} />
      <ProjectIntroduction project={project} />
      <ProjectRepresentativeImages project={project} />
      <ProjectLinks project={project} />
      <MDEditorViewer content={project.content} />
    </Styles.ProjectDetailContainer>
  );
}
