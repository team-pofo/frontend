import { useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import * as Style from "./styles";

export default function UploadBox() {
  const [isActive, setActive] = useState(false);
  const [imgSrc, setImgSrc] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDragStart = () => setActive(true);
  const handleDragEnd = (event: React.DragEvent<HTMLLabelElement>) => {
    // 드래그가 완전히 벗어난 경우에만 setActive(false)를 호출
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setActive(false);
    }
  };
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
    if (file) {
      if (file.type.startsWith("image/")) {
        setFileInfo(file);
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFileInfo(file);
      } else {
        alert("이미지 파일만 업로드할 수 있습니다.");
      }
    }
  };

  const closeImage = (idx: number) => {
    setImgSrc((prevImgSrc) => prevImgSrc.filter((_, i) => i !== idx));
  };

  const ImageWide = ({
    src,
    onClose,
  }: {
    src: string;
    onClose: () => void;
  }) => (
    <Style.ModalOverlay onClick={onClose}>
      <Style.ModalImage src={src} alt="" />
    </Style.ModalOverlay>
  );

  const openImagePreview = (src: string) => {
    setSelectedImage(src);
    setShowModal(true);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <Style.ImageUploadContainer>
      {imgSrc.map((image, index) => (
        <Style.ImagePreview key={index}>
          <img
            src={image}
            onClick={() => {
              openImagePreview(image);
            }}
            alt=""
            width={196}
            height={196}
          />
          <Style.CloseButton
            className="close-button"
            onClick={() => closeImage(index)}
          >
            <IoClose />
          </Style.CloseButton>
          {showModal && selectedImage && (
            <ImageWide src={selectedImage} onClose={closeImagePreview} />
          )}
        </Style.ImagePreview>
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
