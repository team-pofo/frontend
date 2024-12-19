import { useRouter } from "next/router";
import * as Styles from "./styles";
import MDEditorViewer from "./MDEditor/MdeditorViewer";
import Link from "next/link";

export default function ProjectComponents() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Styles.ProjectDetailContainer>
      <Styles.ProjectDetailTitle>프로젝트 제목: {id}</Styles.ProjectDetailTitle>
      <Styles.ProjectDetailText>
        한 줄 소개글 우리 프로젝트 좋아요 많관부
      </Styles.ProjectDetailText>
      <Link href="https://github.com/team-pofo/frontend" legacyBehavior>
        <Styles.ProjectDetailLink target="_blank">
          https://github.com/team-pofo/frontend
        </Styles.ProjectDetailLink>
      </Link>
      <MDEditorViewer />
    </Styles.ProjectDetailContainer>
  );
}
