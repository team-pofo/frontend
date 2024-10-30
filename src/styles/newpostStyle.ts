import styled from "@emotion/styled";

const lightblue = "#0099FC";
const blue = "#0078ff";
const lightgrey = "#d7e2eb";
const grey = "#b2c0cc";
const lightorange = "#FFF3E0";
const lightgreen = "#E0F2F1";

export const NewpostContainer = styled.div`
  max-width: 800px;
  min-height: 100svh;
  align-items: center;
  padding: 20px 20px 0px 20px;
  margin: auto;
`;

export const NewpostNameInput = styled.input`
  border: none;
  border-bottom: 1px solid ${lightgrey};
  outline: none;
  background: white;
  height: 70px;
  width: 100%;
  font-size: 25px;
  // padding-inline-start: 10px;
  // padding-inline-end: 10px;
  margin-bottom: 20px;
`;

export const NewpostOnelineInput = styled.input`
  margin-bottom: 20px;
  border: 2px solid ${lightgrey};
  border-radius: 5px;
  background: white;
  outline: none;
  height: 50px;
  width: 100%;
  font-size: 20px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
`;
