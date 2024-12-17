import { useRouter } from "next/router";
import MDEditorViewer from "./MDEditor/MdeditorViewer";

export default function ProjectComponents() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1> 프로젝트 제목: {id} </h1>
      <h1> 사진 사진 사진 사진</h1>
      <h1> 링크 링크 링크 </h1>
      <h1> Markdown Viewer </h1>

      <MDEditorViewer />
    </div>
  );
}
