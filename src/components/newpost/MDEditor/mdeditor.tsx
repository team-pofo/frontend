import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { uploadImage } from "@/pages/api/NewPost/mdeditor-image-upload";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MdEditor() {
  const [value, setValue] = useState<string>("**프로젝트 소개를 입력하세요**");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (text?: string) => {
    const updatedText = text || "";
    setValue(updatedText);
  };

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    const clipboardItems = clipboardData.items;

    console.log(clipboardItems);

    if (clipboardItems[0].type.startsWith("image/")) {
      const file = clipboardItems[0].getAsFile();

      if (file) {
        setLoading(true);
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setValue(
            (prev) =>
              prev +
              `\n![image](https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_2.jpg)\n`
          );
        }
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <MDEditor
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        textareaProps={{ disabled: loading }}
        style={{
          pointerEvents: loading ? "none" : "auto", // 입력을 막을 때
          opacity: loading ? 0.3 : 1, // 로딩 중에 흐려짐 효과
        }}
      />
    </div>
  );
}

export default MdEditor;
