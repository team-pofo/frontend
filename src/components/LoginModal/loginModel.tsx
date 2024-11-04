import * as S from "./styles";
import close from "../../../public/icons/close.svg";
import Image from "next/image";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <S.Backdrop onClick={handleBackdropClick}>
      <S.ModalColumn>
        <S.CloseButtonContainer>
          <Image
            style={{ cursor: "pointer" }}
            src={close}
            width={20}
            height={20}
            alt="close button"
            onClick={onClose}
          ></Image>
        </S.CloseButtonContainer>
        <S.ModalContent>
          <S.Header>
            <S.Title>POFO 로그인</S.Title>
          </S.Header>
          <S.ButtonBox>
            <S.Button>Github로 로그인</S.Button>
            <S.Button>이메일로 로그인</S.Button>
          </S.ButtonBox>
          <S.CheckboxContainer>
            <input type="checkbox" id="stayLoggedIn" />
            <label htmlFor="stayLoggedIn">로그인 상태 유지</label>
          </S.CheckboxContainer>
          <S.Footer>
            아직 회원이 아니신가요?{" "}
            <S.SignUpLink href="#">회원 가입</S.SignUpLink>
          </S.Footer>
        </S.ModalContent>
      </S.ModalColumn>
    </S.Backdrop>
  );
};

export default Modal;
