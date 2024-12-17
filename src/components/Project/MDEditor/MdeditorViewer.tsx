import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import styles from "./styles.module.css";
import dynamic from "next/dynamic";
import { testReadme } from "./TestReadme";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MDEditorViewer() {
  return (
    <div>
      <MDEditor
        className={styles.editor}
        preview={"preview"}
        hideToolbar={true}
        visiableDragbar={false}
        tabSize={2}
        value={testReadme}
      />
    </div>
  );
}

export default MDEditorViewer;
