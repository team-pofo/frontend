import React, { useEffect, useState } from "react";
import {
  LoginText,
  SignUpButton,
  Logo,
  NavContainer,
  NavItems,
  StyledNavLink,
  HamburgerButton,
  DrawerMenu,
  Overlay,
} from "./styles";
import LoginModal from "../LoginModal/LoginModel";
import hamburger from "../../../public/icons/hamburger.svg";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import userIcon from "../../../public/icons/user.svg";
import { logout } from "@/services/auth";

const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialStep, setInitialStep] = useState<"main" | "signup">("main");
  const { isLoggedIn, logout: clearAuthState } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      setIsModalOpen(false);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      clearAuthState();
      alert("로그아웃 성공!");
    } catch (error) {
      console.error(error);
      alert("로그아웃 실패!");
    }
  };

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <NavContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <HamburgerButton onClick={toggleMenu}>
          <Image
            style={{ cursor: "pointer" }}
            src={hamburger}
            width={20}
            height={20}
            alt="close button"
          />
        </HamburgerButton>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo href="/">POFO</Logo>
          <NavItems>
            <StyledNavLink href="/counter">Home</StyledNavLink>
            <StyledNavLink href="/mypage">MyPage</StyledNavLink>
          </NavItems>
        </div>
      </div>
      <div className="">
        {isLoggedIn ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <LoginText onClick={handleLogout}>로그아웃</LoginText>
            <Image
              style={{ cursor: "pointer" }}
              src={userIcon}
              width={38}
              height={38}
              alt="mypage"
            />
          </div>
        ) : (
          <>
            <LoginText onClick={handleOpenLoginModal}>로그인</LoginText>
            <SignUpButton onClick={handleOpenSignupModal}>
              회원가입
            </SignUpButton>
          </>
        )}
      </div>
      {isMenuOpen && (
        <>
          <Overlay onClick={toggleMenu} />
          <DrawerMenu className={isMenuOpen ? "open" : ""}>
            <StyledNavLink href="/counter" onClick={toggleMenu}>
              Home
            </StyledNavLink>
            <StyledNavLink href="/mypage" onClick={toggleMenu}>
              MyPage
            </StyledNavLink>
            <SignUpButton
              onClick={() => {
                handleOpenSignupModal();
                toggleMenu();
              }}
            >
              회원가입
            </SignUpButton>
          </DrawerMenu>
        </>
      )}
      {isModalOpen && (
        <LoginModal onClose={handleCloseModal} initialStep={initialStep} />
      )}
    </NavContainer>
  );
};

export default Navigation;
