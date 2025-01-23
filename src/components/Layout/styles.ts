import styled from "@emotion/styled";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
`;

const grey = "#59636e";
const lightgrey = "#DEE4E9";
const sidebarHover = "#F2F2F2";

export const MypageContainer = styled.div`
  max-width: 1200px;
  padding: 60px 60px 60px 60px;
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

export const MypageSidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  position: sticky;
  top: 140px;
`;

export const MypageMyinfo = styled.div`
  width: 200px;
  border-bottom: solid 2px ${lightgrey};
  p {
    padding-left: 10px;
  }
`;

export const MypageNickname = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

export const MypageEmail = styled.p`
  color: ${grey};
  margin-bottom: 20px;
`;

export const MypageSidebar = styled.div`
  width: 200px;
  margin-top: 17px;
  display: flex;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 3px;
    padding: 5px 10px 5px;
    border-radius: 10px;
    gap: 15px;
    font-size: 18px;

    &:hover {
      background-color: ${sidebarHover};
    }
  }
  .active {
    background-color: ${sidebarHover};
  }
`;

export const MypageContentContainer = styled.div`
  flex: 1;
  /* min-width: 400px; */
`;
