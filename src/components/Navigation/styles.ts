import styled from "@emotion/styled";
import Link from "next/link";

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 20px;
  color: white;
  border-bottom: 1px solid rgba(90, 101, 119, 0.15);
  background-color: #ffffff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  margin-right: 20px;
  color: #000000;
  font-weight: 700;
  flex-grow: 1;

  @media (max-width: 768px) {
    margin-left: 16px;
  }
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 16px;
  flex: 1;
  font-size: 16px;

  @media (max-width: 768px) {
    display: none;
  }
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

  @media (max-width: 768px) {
    margin-left: auto;
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

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DrawerMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  display: flex;
  flex-direction: column;
  padding: 20px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1099;
`;
