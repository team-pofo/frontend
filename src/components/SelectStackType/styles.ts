import styled from "@emotion/styled";

const blue = "#0078ff";
const grey = "#b2c0cc";
const lightorange = "#FFF3E0";
const lightgreen = "#E0F2F1";

// stack, type 선택 창
export const SelectStackTypeContainer = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const SelectStackTypeCard = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
`;

export const SelectStackTypeBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 2px solid ${grey};
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

export const SelectStackTypeDropdown = styled.div`
  z-index: 10;
  margin-top: 10px;
  border: 2px solid ${grey};
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

export const SelectStackNameInput = styled.input`
  border: 2px solid ${grey};
  border-radius: 5px;
  outline-color: ${blue};
  background: white;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    border-color: ${blue};
  }
`;

export const SelectStackTypeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;

  & > * {
    flex-shrink: 0;
  }
`;

export const SelectStackTypeCheckobx = styled.input`
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

// 선택된 stack, type 보여주는 창
export const SelectedStackTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 10px;
`;

export const SelectedStackCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 20px;
  height: 40px;
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

export const SelectedTypeCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 20px;
  height: 40px;
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

export const SelectedStackTypeResetBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 10px 20px;
  height: 40px;
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
