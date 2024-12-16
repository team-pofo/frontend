import styled from "@emotion/styled";

interface DragProps {
  isActive: boolean;
}

export const ImageDragDiv = styled.div<DragProps>`
  align-items: center;

  border-radius: 5px;
`;
