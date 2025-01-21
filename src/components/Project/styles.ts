import styled from "@emotion/styled";

const lightorange = "#FFF3E0";
const lightgreen = "#E0F2F1";

export const ProjectDetailContainer = styled.div`
  max-width: 1200px;
  align-items: center;
  padding: 20px 20px 20px 20px;
  margin: auto;
`;

export const ProjectDetailTitle = styled.p`
  margin: 0px 0px 10px;
  font-size: 40px;
  font-weight: 700;
`;

export const ProjectDetailIntroduction = styled.p`
  margin: 0px 0px 10px;
  font-size: 25px;
  font-weight: 500;
`;

export const ProjectDetailText = styled.p`
  margin: 0px 0px 10px;
  font-size: 20px;
`;

export const ProjectDetailRepresentativeImageContainer = styled.div`
  display: fixed;
  gap: 20px;
  justify-content: start;
  align-items: center;
  overflow-x: auto;
`;

export const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  margin: 0px 0px 10px;

  img {
    object-fit: cover;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

export const ProjectDetailLink = styled.a`
  padding: 0 0 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const StackTypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 10px;
`;

export const StackCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 15px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${lightorange};
  font-size: 20px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border: none;
    margin-left: 5px;
    cursor: pointer;
    font-size: 30px;
  }
`;

export const TypeCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 15px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${lightgreen};
  font-size: 20px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border: none;

    margin-left: 5px;
    cursor: pointer;
    font-size: 30px;
  }
`;

export const BtnsContainer = styled.div`
  margin-top: 20px;
  display: inline-flex;
  border: solid 2px black;
  border-radius: 20px;
  padding: 5px 15px 0px 15px;
  gap: 15px;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;
