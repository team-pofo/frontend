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
import { getUserInfo, logout, reIssue } from "@/services/auth";
import apiClient from "@/services/axiosClient";
import userIcon from "../../../public/icons/user.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Button } from "../ui/button";
import Link from "next/link";
import { PopoverClose } from "@radix-ui/react-popover";

const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialStep, setInitialStep] = useState<
    "main" | "signup" | "emailLogin" | "emailSignup"
  >("main");
  const [isAuthLoading, setIsAuthLoading] = useState(true); // 로그인 관련 로딩 상태
  const {
    isLoggedIn,
    setAccessToken,
    login,
    logout: clearAuthState,
  } = useAuthStore();

  // 자동 로그인 처리
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const refreshResponse = await reIssue();
        console.log(refreshResponse);
        const newAccessToken = refreshResponse.data.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          const userInfo = await getUserInfo();
          login(newAccessToken, userInfo);
        }
      } catch (error) {
        console.error("자동 로그인 실패:", error);
        clearAuthState(); // 로그아웃 상태로 초기화
      } finally {
        setIsAuthLoading(false); // 로그인 관련 로딩 완료
      }
    };

    autoLogin();
  }, []);

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
    setInitialStep("emailLogin");
    setIsModalOpen(true);
  };

  const handleOpenSignupModal = () => {
    setInitialStep("emailSignup");
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
            <StyledNavLink href="/">Home</StyledNavLink>
            {/* <StyledNavLink href="/mypage">MyPage</StyledNavLink> */}
          </NavItems>
        </div>
      </div>

      <div>
        {/* 로그인 상태 부분만 로딩 상태 관리 */}
        {isAuthLoading ? null : isLoggedIn ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Popover>
              <PopoverTrigger>
                <Image
                  style={{ cursor: "pointer" }}
                  src={userIcon}
                  width={38}
                  height={38}
                  alt="mypage"
                />
              </PopoverTrigger>
              <PopoverContent>
                <Link href="/mypage">
                  <PopoverClose>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {}}
                    >
                      <Image
                        style={{ cursor: "pointer", marginRight: "8px" }}
                        src={"/icons/user_2.svg"}
                        width={18}
                        height={18}
                        alt="mypage"
                      />
                      내 정보
                    </Button>
                  </PopoverClose>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Image
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    src={"/icons/heart.svg"}
                    width={18}
                    height={18}
                    alt="mypage"
                  />
                  찜한 프로젝트
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Image
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    src={"/icons/power.svg"}
                    width={18}
                    height={18}
                    alt="mypage"
                  />
                  로그아웃
                </Button>
              </PopoverContent>
            </Popover>
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
