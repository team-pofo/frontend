import { useRouter } from "next/router";
import * as Styles from "./styles";
import MDEditorViewer from "./MDEditor/MdeditorViewer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const imgList: string[] = [
  `https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_1.jpg`,
  `https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_2.jpg`,
  `https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_3.jpg`,
];

const linkList: string[] = [
  `https://github.com/team-pofo/frontend`,
  `https://google.com`,
];

function ProjectTittle() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Styles.ProjectDetailTitle>외국민 (id:{id})</Styles.ProjectDetailTitle>
  );
}

function ProjectIntroduction() {
  return (
    <div>
      <Styles.ProjectDetailIntroduction>
        외국인 유학생 앱입니다
      </Styles.ProjectDetailIntroduction>
    </div>
  );
}

function ProjectRepresentativeImages() {
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

function ProjectLinks() {
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
  return (
    <Styles.ProjectDetailContainer>
      <ProjectTittle />
      <ProjectIntroduction />
      <ProjectRepresentativeImages />
      <ProjectLinks />
      <MDEditorViewer />
    </Styles.ProjectDetailContainer>
  );
}
