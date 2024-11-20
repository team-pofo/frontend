import styled from "@emotion/styled";

const lightgrey = "#d7e2eb";
const grey = "#b2c0cc";

export const ImageUploadContainer = styled.div`
  display: flex;
  white-space: nowrap;
  gap: 20px;
  justify-content: start;
  align-items: center;
  overflow-x: auto;
`;

interface DragProps {
  isActive: boolean;
}

export const ImageUpload = styled.label<DragProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  min-height: 200px;
  align-items: center;
  border: ${({ isActive }) =>
    isActive ? `dashed 2px black` : `dashed 2px ${grey}`};
  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? lightgrey : "white")};
  cursor: pointer;
  &:hover {
    border-color: black;
  }
`;

export const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  display: inline-block;

  border-radius: 5px;

  img {
    object-fit: contain;
  }

  &:hover .close-button {
    display: flex;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  display: none;
  justify-content: center;
  align-items: center;
  top: 3px;
  right: 3px;
  font-size: 30px;
  background: transparent;
  border: none;
  color: black;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;
