// styles/styles.ts
import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  width: 100%;
  max-width: 1200px; /* 레이아웃의 최대 너비 설정 */

  @media (min-width: 1200px) {
    grid-template-columns: repeat(
      5,
      1fr
    ); /* 화면이 충분히 넓을 때 5열로 고정 */
  }
  @media (max-width: 1200px) and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
