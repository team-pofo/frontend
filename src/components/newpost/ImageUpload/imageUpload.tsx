import { useState } from "react";
import { MdUploadFile } from "react-icons/md";
import * as Style from "./styles";

export default function UploadBox() {
  const [isActive, setActive] = useState(false);
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imgSrc.length >= 3) {
      alert("이미지는 최대 3개까지 등록 가능합니다");
    }
    const file = e.target.files?.[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // 로딩이 완료되면 실행할 콜백 함수 등록
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        // setImgSrc(e.target?.result);
        setImgSrc((prevState) => [...prevState, e.target?.result as string]);
      }
    };
  };

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);
  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const setFileInfo = (file: File) => {
    if (imgSrc.length >= 3) {
      alert("이미지는 최대 3개까지 등록 가능합니다");
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    // 로딩이 완료되면 실행할 콜백 함수 등록
    fileReader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImgSrc((prevState) => [...prevState, e.target?.result as string]);
      }
    };
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setActive(false);

    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileInfo(file);
    }
  };

  return (
    <Style.ImageUploadContainer>
      {imgSrc.map((img, index) => (
        <Style.ImagePreview src={img} alt="" width={200} height={150} />
      ))}
      <Style.ImageUpload
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
        isActive={isActive}
      >
        <input
          type="file"
          className="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <>
          <MdUploadFile style={{ fontSize: "100px", marginBottom: "20px" }} />
          <p>클릭 또는 드롭</p>
        </>
      </Style.ImageUpload>
    </Style.ImageUploadContainer>
  );
}
