import styled from "@emotion/styled";

export const SearchCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 50px;
  width: 50%;
  min-width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const SearchCard = styled.div`
  height: 100%;
  width: 30%;
  margin-bottom: 10px;
`;

export const SearchNameInput = styled.input`
  border: 2px solid #d7e2eb;
  border-radius: 5px;
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
  border: 2px solid #d7e2eb;
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
  border: 2px solid #d7e2eb;
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

export const SearchSelectedStackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 30px;
  width: 50%;
  min-width: 500px;
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
  background-color: #f0f0f0;

  button {
    width: 20px;
    height: 20px;
    border: none;
    background-color: #f0f0f0;
    margin-left: 5px;
    cursor: pointer;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: #0078ff;
    }
  }
`;
