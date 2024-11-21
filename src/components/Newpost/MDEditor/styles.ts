import styled from "@emotion/styled";

const lightgrey = "#d7e2eb";

interface DragProps {
  isActive: boolean;
}

export const ImageDragDiv = styled.div<DragProps>`
  align-items: center;

  border-radius: 5px;
  background-color: ${({ isActive }) => (isActive ? lightgrey : "white")};
  opacity: ${({ isActive }) => (isActive ? "0.3" : "1.0")};
`;
