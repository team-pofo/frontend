import styled from "@emotion/styled";

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
  z-index: 1000;
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
