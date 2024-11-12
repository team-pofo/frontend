import styled from "@emotion/styled";

// const lightblue = "#0099FC";
// const blue = "#0078ff";
const lightgrey = "#d7e2eb";
const grey = "#b2c0cc";
// const lightorange = "#FFF3E0";
// const lightgreen = "#E0F2F1";

export const ImageUploadContainer = styled.div`
  display: flex;
  white-space: nowrap;
  gap: 20px;
  padding: 20px 0px 20px 0px;
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
  min-width: 200px;
  min-height: 200px;
  img {
    object-fit: contain;
  }

  position: relative;
  display: inline-block;

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
  top: 5px;
  right: 5px;
  font-size: 30px;
  background: white;
  border: none;
  // border-radius: 20px;
  color: black;
  cursor: pointer;
`;

// export const ImagePreview = styled.img`
//   min-width: 200px;
//   min-height: 200px;
//   object-fit: contain;
// `;
