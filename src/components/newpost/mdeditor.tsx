import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MdEditor() {
  const [value, setValue] = useState<string>("**프로젝트 소개를 입력하세요**");

  const handleChange = (val?: string) => {
    setValue(val ?? "");
  };

  return (
    <div>
      <MDEditor value={value} onChange={handleChange} />
    </div>
  );
}

export default MdEditor;
