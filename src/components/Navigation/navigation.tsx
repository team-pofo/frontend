// components/Navigation.tsx
import React from "react";
import {
  LoginButton,
  Logo,
  NavContainer,
  NavItems,
  StyledNavLink,
} from "./styles";
import Link from "next/link";

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <Link href="/" passHref>
        <Logo>POFO</Logo>
      </Link>
      <NavItems>
        <StyledNavLink href="/counter">Home</StyledNavLink>
        <StyledNavLink href="/mypage">MyPage</StyledNavLink>
      </NavItems>
      <LoginButton>Login</LoginButton>
    </NavContainer>
  );
};

export default Navigation;
