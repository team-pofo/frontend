import styled from "@emotion/styled";
import Link from "next/link";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  border-bottom: 0.5px solid #000000;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(90, 101, 119, 0.15);
`;

export const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  color: #000000;
  margin-right: 16px;
  cursor: pointer;
  font-weight: 700;
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 16px;
  flex: 1;
  font-size: 16px;
`;

export const StyledNavLink = styled(Link)`
  margin-right: 15px;
  cursor: pointer;
  color: #000000;
  text-decoration: none;

  &:hover {
    color: #555;
  }
`;

export const LoginText = styled.span`
  cursor: pointer;
  color: #000000;
  margin-right: 15px;
  font-size: 16px;

  &:hover {
    color: #555;
  }
`;

export const SignUpButton = styled.button`
  background-color: #000000;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 16px;

  &:hover {
    background-color: #333;
  }
`;
