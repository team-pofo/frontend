// components/Navigation.tsx
import React, { useState } from "react";
import {
  LoginText,
  SignUpButton,
  Logo,
  NavContainer,
  NavItems,
  StyledNavLink,
} from "./styles";
import LoginModal from "../LoginModal/loginModel";

const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialStep, setInitialStep] = useState<"main" | "signup">("main");

  const handleOpenLoginModal = () => {
    setInitialStep("main");
    setIsModalOpen(true);
  };

  const handleOpenSignupModal = () => {
    setInitialStep("signup");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <NavContainer>
      <Logo href="/">POFO</Logo>
      <NavItems>
        <StyledNavLink href="/counter">Home</StyledNavLink>
        <StyledNavLink href="/mypage">MyPage</StyledNavLink>
      </NavItems>
      <LoginText onClick={handleOpenLoginModal}>로그인</LoginText>
      <SignUpButton onClick={handleOpenSignupModal}>회원가입</SignUpButton>
      {isModalOpen && (
        <LoginModal onClose={handleCloseModal} initialStep={initialStep} />
      )}
    </NavContainer>
  );
};

export default Navigation;
