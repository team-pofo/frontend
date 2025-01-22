import React, { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import close from "../../../public/icons/close.svg";
import chevron_left from "../../../public/icons/chevron_left.svg";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import {
  checkNicknameAvailability,
  getUserInfo,
  login,
  signup,
} from "@/services/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
  initialStep?:
    | "emailLogin"
    | "emailSignup"
    | "passwordReset"
    | "main"
    | "signup";
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  initialStep = "emailLogin",
}) => {
  const [modalStep, setModalStep] = useState(initialStep);

  // 회원가입관련 상태
  const [formData, setFormData] = useState({
    Nickname: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [showNicknameError, setShowNicknameError] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isAgreeContract, setIsAgreeContract] = useState(false);
  const [isPossibleSignup, setIsPossibleSignup] = useState(false);

  // 로그인관련 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setLoginState } = useAuthStore();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    setModalStep(initialStep);
  }, [initialStep]);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string): boolean => {
    const specialCharCount = password.replace(
      /[^!@#$%^&*(),.?":{}|<>]/g,
      "",
    ).length;
    const numberCount = password.replace(/[^0-9]/g, "").length;
    return password.length >= 10 && specialCharCount >= 2 && numberCount >= 2;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setFormData({ ...formData, email: emailValue });
    setIsEmailValid(validateEmail(emailValue));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setFormData({ ...formData, password: passwordValue });
    setIsPasswordValid(validatePassword(passwordValue));
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const NicknameValue = e.target.value;
    setFormData({ ...formData, Nickname: NicknameValue });
  };

  const handleAgreeTermsChange = (checked: boolean) => {
    const isChecked = !!checked;
    setFormData((prevFormData) => ({ ...prevFormData, agreeTerms: isChecked }));
    setIsAgreeContract(isChecked);
  };

  // 닉네임 중복 확인
  const handleNicknameCheck = async () => {
    if (!formData.Nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      setShowNicknameError(false);
      return;
    }
    setShowNicknameError(true);
    try {
      const response = await checkNicknameAvailability(formData.Nickname);
      console.log(response);
      setIsNicknameAvailable(response.isAvailable);
      if (response.isAvailable) {
        setIsNicknameAvailable(true);
      }
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
    // setIsNicknameAvailable(true);
  };

  // 입력값 상태 바뀔때마다 회원가입 요건 충족했는지 확인
  useEffect(() => {
    if (
      isNicknameAvailable &&
      isEmailValid &&
      isPasswordValid &&
      isAgreeContract
    ) {
      setIsPossibleSignup(true);
    } else {
      setIsPossibleSignup(false);
    }
  }, [isNicknameAvailable, isEmailValid, isPasswordValid, isAgreeContract]);

  // 회원가입 요청 처리
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    // TODO 닉네임도 회원가입때 같이 넘겨야함
    try {
      const response = await signup(email, password);
      console.log("response");
      console.log(response);
      alert("회원가입 성공!");
      setModalStep("emailLogin");
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
      return;
    }

    try {
      // 서버로 로그인 요청
      const response = await login(email, password);
      console.log("response");
      console.log(response);
      // const token = response.data.accessToken;
      if (response.success) {
        setAccessToken(response.data.accessToken);

        try {
          const response = await getUserInfo();
          if (response.success) {
            setLoginState(response.data);
          }
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

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/oauth2-login/github`;
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

        {/* 로그인 부분 */}
        {modalStep === "emailLogin" && (
          <S.ModalContent>
            <S.Header>
              <S.Title>로그인</S.Title>
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
            <Button style={{ marginTop: "10px" }} onClick={handleEmailLogin}>
              로그인
            </Button>
            <S.Footer style={{ marginBottom: "0px", marginTop: "20px" }}>
              비밀번호를 잊으셨나요?
              <S.SignUpLink onClick={() => switchModalStep("passwordReset")}>
                비밀번호 찾기
              </S.SignUpLink>
            </S.Footer>
            <S.Footer style={{ marginBottom: "20px" }}>
              아직 회원이 아니신가요?
              <S.SignUpLink onClick={() => switchModalStep("emailSignup")}>
                회원가입
              </S.SignUpLink>
            </S.Footer>
            <div
              style={{
                border: "0.5px solid #c8c8c8",
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <Button onClick={handleGitHubLogin}>Github로 계속하기</Button>
          </S.ModalContent>
        )}

        {/* 회원가입 부분 */}
        {modalStep === "emailSignup" && (
          <S.ModalContent>
            <S.Header>
              <S.Title>회원가입</S.Title>
            </S.Header>
            <S.InputContainer>
              <label htmlFor="Nickname">닉네임</label>
              <div style={{ display: "flex", gap: "12px" }}>
                <Input
                  id="Nickname"
                  placeholder="닉네임을 입력하세요"
                  value={formData.Nickname}
                  onChange={handleNicknameChange}
                />
                <Popover>
                  <PopoverTrigger>
                    <Button variant="outline" onClick={handleNicknameCheck}>
                      중복 확인
                    </Button>
                  </PopoverTrigger>
                  {showNicknameError && (
                    <PopoverContent style={{ width: "100%" }}>
                      <label style={{ fontSize: "14px" }}>
                        {isNicknameAvailable
                          ? "사용 가능한 닉네임입니다"
                          : "이미 사용중인 닉네임입니다"}
                      </label>
                    </PopoverContent>
                  )}
                </Popover>
              </div>
              {formData.Nickname && !isNicknameAvailable && (
                <label
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginLeft: "4px",
                    marginTop: "6px",
                  }}
                >
                  닉네임 중복 확인이 필요합니다
                </label>
              )}
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="email">이메일</label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChange={handleEmailChange}
              />
              {formData.email && !isEmailValid && (
                <label
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginLeft: "4px",
                    marginTop: "6px",
                  }}
                >
                  올바른 이메일 형식이 아닙니다
                </label>
              )}
            </S.InputContainer>
            <S.InputContainer>
              <label htmlFor="password">비밀번호</label>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handlePasswordChange}
              />
              {formData.password && !isPasswordValid && (
                <label
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginLeft: "4px",
                    marginTop: "6px",
                  }}
                >
                  특수문자 2자리, 숫자 2자리 포함 10자 이상이어야 합니다
                </label>
              )}
            </S.InputContainer>
            <S.CheckboxContainer>
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={handleAgreeTermsChange}
              />
              <label htmlFor="agreeTerms">다음 약관에 모두 동의합니다.</label>
            </S.CheckboxContainer>
            <Button disabled={!isPossibleSignup} onClick={handleSignUp}>
              가입하기
            </Button>
            <S.Footer style={{ marginBottom: "20px", marginTop: "20px" }}>
              이미 회원이신가요?
              <S.SignUpLink onClick={() => switchModalStep("emailLogin")}>
                로그인
              </S.SignUpLink>
            </S.Footer>
            <div
              style={{
                border: "0.5px solid #c8c8c8",
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <Button onClick={handleGitHubLogin}>Github로 계속하기</Button>
          </S.ModalContent>
        )}

        {/* 비밀번호 찾기 부분 */}
        {modalStep === "passwordReset" && (
          <S.ModalContent>
            <S.Header>
              <S.BackIconContainer>
                <Image
                  src={chevron_left}
                  width={24}
                  height={24}
                  alt="back"
                  onClick={() => switchModalStep("emailLogin")}
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
            <S.Button
              style={{ marginTop: "10px" }}
              bgColor="#000000"
              textColor="#ffffff"
            >
              임시 비밀번호 전송
            </S.Button>
            <S.Footer style={{ marginBottom: "20px", marginTop: "20px" }}>
              비밀번호가 기억나셨나요?
              <S.SignUpLink onClick={() => switchModalStep("emailLogin")}>
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
