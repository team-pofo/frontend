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
  padding: 10px;
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
  min-height: 300px;
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

export const ImagePreview = styled.img`
  min-width: 200px;
  min-height: 150px;
`;
