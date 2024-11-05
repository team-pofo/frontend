import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  gap: 16px;
  padding: 20px;
  max-width: 1800px;
  margin: 0 auto;
  width: 100%;
  place-items: center;

  // 1920px 이상일 때 5열
  @media (min-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
  }
  // 1200px 이상 1920px 미만일 때 4열
  @media (min-width: 1200px) and (max-width: 1919px) {
    grid-template-columns: repeat(4, 1fr);
  }
  // 768px 이상 1200px 미만일 때 3열
  @media (min-width: 768px) and (max-width: 1299px) {
    grid-template-columns: repeat(3, 1fr);
  }
  // 480px 이상 768px 미만일 때 2열
  @media (min-width: 480px) and (max-width: 999px) {
    grid-template-columns: repeat(2, 1fr);
  }
  // 480px 미만일 때 1열
  @media (max-width: 699px) {
    grid-template-columns: 1fr;
  }
`;
