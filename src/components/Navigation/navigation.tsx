// components/Navigation.tsx
import React, { useState } from "react";
import {
  LoginButton,
  Logo,
  NavContainer,
  NavItems,
  StyledNavLink,
} from "./styles";
import Link from "next/link";
import LoginModal from "../LoginModal/loginModel";

const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <NavContainer>
      <Link href="/" passHref>
        <Logo>POFO</Logo>
      </Link>
      <NavItems>
        <StyledNavLink href="/counter">Home</StyledNavLink>
        <StyledNavLink href="/mypage">MyPage</StyledNavLink>
      </NavItems>
      <LoginButton onClick={handleOpenModal}>Login</LoginButton>{" "}
      {isModalOpen && (
        <LoginModal onClose={handleCloseModal}>로그인 폼</LoginModal>
      )}
    </NavContainer>
  );
};

export default Navigation;
