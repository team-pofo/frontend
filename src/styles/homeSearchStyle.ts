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

export const SearchCardContainer1 = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;
`;

export const SearchCardContainer2 = styled.div`
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

export const SearchStackBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid ${lightgrey};
  border-radius: 5px;
  background-color: white;
  height: 100%;
  width: 100%;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const SearchStackDropdown = styled.div`
  margin-top: 10px;
  border: 2px solid ${lightgrey};
  border-radius: 5px;
  border-width: 2px;
  font-size: 20px;
  padding: 10px;
  height: 200px;
  overflow-y: scroll;
  background-color: white;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SearchStackNameInput = styled.input`
  border: 2px solid #d7e2eb;
  border-radius: 5px;
  outline-color: ${blue};
  background: white;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;

  &:hover {
    border-color: ${blue};
  }
`;

export const SearchDropdownLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  /* 자식 요소의 shrink 방지 */
  & > * {
    flex-shrink: 0;
  }
`;

export const SearchCheckbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 2px solid ${grey};
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 2px solid ${blue};
  }

  &:checked {
    border: 2px solid ${blue};
    background-color: ${blue};
  }

  &:checked::before {
    content: "✔";
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
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

export const SearchSelectedStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 30px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export const SearchSelectedStackCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${lightorange};
  font-size: 20px;

  button {
    width: 20px;
    height: 20px;
    border: none;
    background-color: ${lightorange};
    margin-left: 5px;
    cursor: pointer;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    &:hover {
      color: #0078ff;
    }
  }
`;

export const SearchSelectedTypesCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${lightgreen};
  font-size: 20px;

  button {
    width: 20px;
    height: 20px;
    border: none;
    background-color: ${lightgreen};
    margin-left: 5px;
    cursor: pointer;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;

    &:hover {
      color: ${blue};
    }
  }
`;

export const SearchResetBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: #d6ecfa;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    color: red;
  }
`;
