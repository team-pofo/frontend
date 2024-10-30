// styles/styles.ts
import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  max-width: 1800px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
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
