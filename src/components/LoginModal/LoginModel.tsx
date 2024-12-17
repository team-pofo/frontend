import React, { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import close from "../../../public/icons/close.svg";
import chevron_left from "../../../public/icons/chevron_left.svg";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { login } from "@/services/auth";
import { Button } from "../ui/button";
import KeepLogin from "./KeepLogin";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
  initialStep?:
    | "main"
    | "emailLogin"
    | "signup"
    | "emailSignup"
    | "passwordReset";
}

const Modal: React.FC<ModalProps> = ({ onClose, initialStep = "main" }) => {
  const [modalStep, setModalStep] = useState(initialStep);
  const { login: setLoginState } = useAuthStore();

  useEffect(() => {
    setModalStep(initialStep);
  }, [initialStep]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login("email", "password");
      setLoginState(user);
      console.log(user);
      alert("로그인 성공!");
    } catch (error) {
      console.error(error);
      alert("로그인 실패!");
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSwitchToEmailLogin = () => {
    setModalStep("emailLogin");
  };

  const handleSwitchToSignup = () => {
    setModalStep("signup");
  };

  const handleSwitchToEmailSignup = () => {
    setModalStep("emailSignup");
  };

  const handleSwitchToPasswordReset = () => {
    setModalStep("passwordReset");
  };

  const handleSwitchToMainLogin = () => {
    setModalStep("main");
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
          />
        </S.CloseButtonContainer>
        {modalStep === "main" && (
          <S.ModalContent>
            <S.Header>
              <S.Title>POFO 로그인</S.Title>
            </S.Header>
            <S.ButtonBox>
              <Button>Github로 로그인</Button>
              <Button variant={"secondary"} onClick={handleSwitchToEmailLogin}>
                이메일로 로그인
              </Button>
              <Button variant={"destructive"} onClick={handleLogin}>
                로그인 테스트
              </Button>
            </S.ButtonBox>
            <KeepLogin />
            <S.Footer>
              아직 회원이 아니신가요?
              <S.SignUpLink onClick={handleSwitchToSignup}>
                회원가입
              </S.SignUpLink>
            </S.Footer>
          </S.ModalContent>
        )}
        {modalStep === "emailLogin" && (
          <S.ModalContent>
            <S.Header>
              <S.BackIconContainer>
                <Image
                  src={chevron_left}
                  width={24}
                  height={24}
                  alt="back"
                  onClick={handleSwitchToSignup}
                />
              </S.BackIconContainer>
              <S.Title>Email로 로그인</S.Title>
            </S.Header>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <Input type="email" placeholder="이메일을 입력하세요" />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="password">비밀번호</label>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </S.InputContainer>
            <KeepLogin />
            <Button>로그인</Button>
            <S.Footer style={{ marginBottom: "0px" }}>
              비밀번호를 잊으셨나요?
              <S.SignUpLink onClick={handleSwitchToPasswordReset}>
                비밀번호 찾기
              </S.SignUpLink>
            </S.Footer>
            <S.Footer>
              아직 회원이 아니신가요?
              <S.SignUpLink onClick={handleSwitchToSignup}>
                회원가입
              </S.SignUpLink>
            </S.Footer>
          </S.ModalContent>
        )}
        {modalStep === "signup" && (
          <S.ModalContent>
            <S.Header>
              <S.Title>POFO에 오신 것을 환영합니다.</S.Title>
            </S.Header>
            <S.ButtonBox>
              <Button>Github로 가입</Button>
              <Button variant={"secondary"} onClick={handleSwitchToEmailSignup}>
                이메일로 가입
              </Button>
            </S.ButtonBox>
            <S.Footer>
              이미 회원이신가요?
              <S.SignUpLink onClick={handleSwitchToMainLogin}>
                로그인
              </S.SignUpLink>
            </S.Footer>
          </S.ModalContent>
        )}
        {modalStep === "emailSignup" && (
          <S.ModalContent>
            <S.Header>
              <S.BackIconContainer>
                <Image
                  src={chevron_left}
                  width={24}
                  height={24}
                  alt="back"
                  onClick={handleSwitchToSignup}
                />
              </S.BackIconContainer>
              <S.Title>Email로 가입</S.Title>
            </S.Header>
            <S.InputContainer>
              <label htmlFor="name">이름</label>
              <Input type="email" placeholder="이름을 입력하세요" />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <Input type="email" placeholder="이메일을 입력하세요" />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="password">비밀번호</label>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </S.InputContainer>
            <S.CheckboxContainer>
              <Checkbox id="agreeTerms" />
              <label htmlFor="agreeTerms">다음 약관에 모두 동의합니다.</label>
              <S.ForgotLink href="#">약관 보기</S.ForgotLink>
            </S.CheckboxContainer>
            <S.Button bgColor="#000000" textColor="#ffffff">
              가입하기
            </S.Button>
            <S.Footer>
              이미 회원이신가요?
              <S.SignUpLink onClick={handleSwitchToMainLogin}>
                로그인
              </S.SignUpLink>
            </S.Footer>
          </S.ModalContent>
        )}
        {modalStep === "passwordReset" && (
          <S.ModalContent>
            <S.Header>
              <S.BackIconContainer>
                <Image
                  src={chevron_left}
                  width={24}
                  height={24}
                  alt="back"
                  onClick={handleSwitchToSignup}
                />
              </S.BackIconContainer>
              <S.Title>비밀번호 찾기</S.Title>
            </S.Header>
            <p style={{ color: "black", marginBottom: "40px" }}>
              가입한 이메일 주소로 임시 비밀번호를 알려드립니다. 로그인 후
              비밀번호를 꼭 변경해주세요.
            </p>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
              />
            </S.InputContainer>
            <S.Button bgColor="#000000" textColor="#ffffff">
              임시 비밀번호 전송
            </S.Button>
            <S.Footer>
              비밀번호가 기억나셨나요?
              <S.SignUpLink onClick={handleSwitchToMainLogin}>
                로그인
              </S.SignUpLink>
            </S.Footer>
          </S.ModalContent>
        )}
      </S.ModalColumn>
    </S.Backdrop>
  );
};

export default Modal;
