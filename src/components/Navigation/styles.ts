// styles/Navigation.styles.ts
import styled from "@emotion/styled";
import Link from "next/link";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #333;
  color: white;
`;

export const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: white;
  margin-right: 16px;
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 16px;
  flex: 1;
`;

export const StyledNavLink = styled(Link)`
  margin-right: 15px;
  cursor: pointer;
  color: #ddd;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

export const NavItem = styled.li`
  margin-right: 32px;
  cursor: pointer;
  color: #ddd;

  &:hover {
    color: #fff;
  }
`;

export const LoginButton = styled.button`
  background-color: #555;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #777;
  }
`;
