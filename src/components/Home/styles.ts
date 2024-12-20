import styled from "@emotion/styled";

const grey = "#b2c0cc";
const black = "#09060B";

export const SearchContainer = styled.div`
  max-width: 800px;
  align-items: center;
  width: 100%;
  padding: 20px 20px 0px 20px;
  margin: auto;
`;

export const SearchCardContainerName = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;
`;

export const SearchCardContainerStack = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SearchCard = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

export const SearchNameInput = styled.input`
  border: 2px solid ${grey};
  border-radius: 5px;
  outline-color: ${black};
  background: white;
  height: 50px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
`;
