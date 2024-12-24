import styled from "@emotion/styled";

const blue = "#0078ff";
const lightgrey = "#d7e2eb";
const grey = "#b2c0cc";

export const NewpostContainer = styled.div`
  max-width: 1200px;
  min-height: 100svh;
  align-items: center;
  padding: 20px 20px 20px 20px;
  margin: auto;
`;

export const NewpostCard = styled.div`
  /* display: flex;
  flex-direction: column; */
  width: 100%;
  margin-bottom: 20px;
`;

export const NewpostText = styled.p`
  margin: 0px 0px 10px;
  font-size: 20px;
`;

export const NewpostNameInput = styled.input`
  border: none;
  border-bottom: 2px solid ${lightgrey};
  outline: none;
  background: white;
  height: 70px;
  width: 100%;
  font-size: 25px;
  &:hover {
    border-color: ${blue};
  }
  &:focus {
    border-color: ${blue};
  }
`;

export const NewpostOnelineInput = styled.input`
  border: 2px solid ${grey};
  border-radius: 5px;
  background: white;
  height: 50px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  outline-color: ${blue};
  &:hover {
    border-color: ${blue};
  }
`;

// 참고 링크
export const NewpostLinkContainer = styled.div``;

export const NewpostLinkBtn = styled.button`
  border: 2px solid ${grey};
  border-radius: 5px;
  background-color: ${grey};
  color: white;
  min-height: 50px;
  min-width: 50px;
  font-size: 25px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 2px solid ${blue};
    background: ${blue};
  }
`;
