import React, { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import close from "../../../public/icons/close.svg";
import chevron_left from "../../../public/icons/chevron_left.svg";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { getUserInfo, login, signup } from "@/services/auth";
import { Button } from "../ui/button";
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
  // 회원가입관련 상태
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  // 로그인관련 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setLoginState } = useAuthStore();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    setModalStep(initialStep);
  }, [initialStep]);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
  };

  // 회원가입 요청 처리
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name, agreeTerms } = formData;

    // 유효성 검사
    if (!name || !email || !password || !agreeTerms) {
      alert("모든 필드를 입력하고 약관에 동의해주세요.");
      return;
    }

    try {
      const response = await signup(email, password);
      console.log("response");
      console.log(response);
      alert("회원가입 성공!");
      setModalStep("main"); // 메인 화면으로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 입력값 검증 및 로그인 요청
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값 검증
    if (!email.trim() || !password.trim()) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 서버로 로그인 요청
      const response = await login(email, password);
      console.log("response");
      console.log(response);
      const token = response.data.accessToken;
      if (response.success) {
        setAccessToken(response.data.accessToken);

        try {
          const response = await getUserInfo();
          if (response.success) {
            setLoginState(token, response.data);
          }
          console.log(response);
        } catch {
          console.log("error");
        }

        alert("로그인 성공!");
        onClose();
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const switchModalStep = (
    step: Exclude<ModalProps["initialStep"], undefined>,
  ) => {
    setModalStep(step);
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
              <Button
                variant={"secondary"}
                onClick={() => switchModalStep("emailLogin")}
              >
                이메일로 로그인
              </Button>
            </S.ButtonBox>
            <S.Footer>
              아직 회원이 아니신가요?
              <S.SignUpLink onClick={() => switchModalStep("signup")}>
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
                  onClick={() => switchModalStep("signup")}
                />
              </S.BackIconContainer>
              <S.Title>Email로 로그인</S.Title>
            </S.Header>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </S.InputContainer>
            <Button onClick={handleEmailLogin}>로그인</Button>
            <S.Footer style={{ marginBottom: "0px" }}>
              비밀번호를 잊으셨나요?
              <S.SignUpLink onClick={() => switchModalStep("passwordReset")}>
                비밀번호 찾기
              </S.SignUpLink>
            </S.Footer>
            <S.Footer>
              아직 회원이 아니신가요?
              <S.SignUpLink onClick={() => switchModalStep("signup")}>
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
              <Button
                variant={"secondary"}
                onClick={() => switchModalStep("emailSignup")}
              >
                이메일로 가입
              </Button>
            </S.ButtonBox>
            <S.Footer>
              이미 회원이신가요?
              <S.SignUpLink onClick={() => switchModalStep("main")}>
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
                  onClick={() => switchModalStep("signup")}
                />
              </S.BackIconContainer>
              <S.Title>Email로 가입</S.Title>
            </S.Header>
            <S.InputContainer>
              <label htmlFor="name">이름</label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleChange}
              />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleChange}
              />
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
              />
            </S.InputContainer>
            <S.CheckboxContainer>
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeTerms: !!checked })
                }
              />
              <label htmlFor="agreeTerms">다음 약관에 모두 동의합니다.</label>
            </S.CheckboxContainer>
            <Button onClick={handleSignUp}>가입하기</Button>
            <S.Footer>
              이미 회원이신가요?
              <S.SignUpLink onClick={() => switchModalStep("main")}>
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
                  onClick={() => switchModalStep("signup")}
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
              <S.SignUpLink onClick={() => switchModalStep("main")}>
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
