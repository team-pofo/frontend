import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import Spinners from "@/components/Common/Spinners";
import { uploadImage } from "@/pages/api/NewPost/mdeditor-image-upload";
import dynamic from "next/dynamic";
import { useState } from "react";
import * as Style from "./styles";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function MdEditor() {
  const [value, setValue] = useState<string>("**프로젝트 소개를 입력하세요**");
  const [loading, setLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  // 이미지 드래그 앤 드롭 관련 처리
  const handleDragEnter = () => setIsActive(true);
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    // 드래그가 완전히 벗어난 경우에만 setActive(false)를 호출
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsActive(false);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActive(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = async (e) => {
          if (typeof e.target?.result === "string") {
            setLoading(true);
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
              setValue(
                (prev) =>
                  prev.substring(0, cursorPosition) +
                  `\n![image](https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_3.jpg)\n` +
                  prev.substring(cursorPosition)
              );
            }
            setLoading(false);
          }
        };
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  // 이미지 붙여넣기 처리
  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    const clipboardItems = clipboardData.items;

    if (clipboardItems[0].type.startsWith("image/")) {
      const file = clipboardItems[0].getAsFile();

      if (file) {
        setLoading(true);
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setValue(
            (prev) =>
              prev.substring(0, cursorPosition) +
              `\n![image](https://www.kookmin.ac.kr/content/05sub/style0005/images/sub/ui_5_col_image_2.jpg)\n` +
              prev.substring(cursorPosition)
          );
        }
        setLoading(false);
      }
    }
  };

  // 입력 처리
  const handleChange = (text?: string) => {
    const updatedText = text || "";
    setValue(updatedText);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const position = event.target.selectionStart;
    setCursorPosition(position);
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const position = event.currentTarget.selectionStart;
    setCursorPosition(position);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const position = event.currentTarget.selectionStart;
    setCursorPosition(position);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const position = event.currentTarget.selectionStart;
    setCursorPosition(position);
  };

  return (
    <div style={{ position: "relative" }}>
      <Style.ImageDragDiv
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        isActive={isActive}
      >
        <MDEditor
          height={600}
          toolbarHeight={40}
          visiableDragbar={false}
          tabSize={2}
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          textareaProps={{
            onFocus: handleFocus,
            onSelect: handleSelect,
            onMouseUp: handleMouseUp,
            onKeyUp: handleKeyUp,
            disabled: loading,
          }}
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            }}
          >
            <Spinners />
          </div>
        )}
      </Style.ImageDragDiv>
    </div>
  );
}

export default MdEditor;
