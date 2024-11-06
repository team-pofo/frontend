import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MdEditor() {
  const [value, setValue] = useState<string>("**Hello world!!!**");

  const handleChange = (val?: string) => {
    setValue(val ?? "");
  };

  return (
    <div>
      <style jsx global>{`
        // .w-md-editor-toolbar button {
        //   width: 36px;
        //   height: 36px;
        //   font-size: 16px;
        //   padding: 8px;
        //   &svg {
        //     width: 15px;
        //     height: 15px;
        //   }
        // }

        .w-md-editor .w-md-editor-text,
        .w-md-editor-preview {
          font-size: 18px;
        }
      `}</style>
      <MDEditor value={value} onChange={handleChange} />
    </div>
  );
}

export default MdEditor;
