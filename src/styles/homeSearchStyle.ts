import styled from "@emotion/styled";

export const SearchWrapperContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 50px;
  width: 50%;
  min-width: 500px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const SearchWrapper = styled.div`
  height: 100%;
  width: 30%;
  margin-bottom: 10px;
`;

export const SearchNameInput = styled.input`
  border-style: solid;
  border-radius: 5px;
  border-color: #d7e2eb;
  background: white;
  height: 100%;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 5%;
  padding-inline-end: 5%;
`;

export const SearchStackBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-style: solid;
  border-radius: 5px;
  border-color: #d7e2eb;
  background-color: white;
  height: 100%;
  width: 100%;
  font-size: 20px;
`;

export const SearchStackDropdown = styled.div`
  margin-top: 10px;
  border-style: solid;
  border-radius: 5px;
  border-color: #d7e2eb;
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
  border-style: solid;
  border-radius: 5px;
  border-color: #d7e2eb;
  background: white;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 5%;
  padding-inline-end: 5%;
`;

export const SearchDropdownLabel = styled.label`
  display: flex;
  alignitems: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const SearchCheckbox = styled.input`
  appearance: none;
  width: 25px;
  height: 25px;
  border: 2px solid #b2c0cc;
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  &:hover {
    border: 2px solid #0078ff;
  }

  &:checked {
    border: 2px solid #0078ff;
    background-color: #0078ff;
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
