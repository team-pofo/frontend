import styled from "@emotion/styled";

const lightblue = "#0099FC";
const blue = "#0078ff";
const lightgrey = "#d7e2eb";
const grey = "#b2c0cc";
const lightorange = "#FFF3E0";
const lightgreen = "#E0F2F1";

export const SearchContainer = styled.div`
  max-width: 800px;
  align-items: center;
  width: 100%;
  padding: 20px 20px 0px 20px;
  margin: auto;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
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
  border: 2px solid ${lightgrey};
  border-radius: 5px;
  outline-color: ${blue};
  background: white;
  height: 100%;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;

  &:hover {
    border-color: ${blue};
  }
`;

export const SearchBtn = styled.button`
  text-align: center;
  padding: 10px;
  border: 2px solid ${lightblue};
  border-radius: 5px;
  background-color: ${lightblue};
  color: white;
  font-size: 5px;
  font-weight: bold;
  height: 100%;
  width: 80px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    border: 2px solid ${blue};
    background: ${blue};
  }
`;
