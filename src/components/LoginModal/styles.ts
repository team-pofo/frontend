/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalColumn = styled.div`
  background: white;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 30px;
  color: black;
  font-size: 20px;
`;

export const CloseButton = styled.img`
  cursor: pointer;
`;

export const CloseButtonContainer = styled.div`
  padding: 16px 16px 8px;
  width: 100%;
  display: flex;
  justify-content: right;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface ButtonProps {
  bgColor?: string;
  textColor?: string;
}

export const Button = styled.button<ButtonProps>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor || "#333"};
  color: ${({ textColor }) => textColor || "#fff"};
  text-align: center;
  width: 100%;
  font-size: 14px;

  &:hover {
    background-color: #555;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: black;
  font-size: 14px;
  margin-top: 30px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  color: black;
  gap: 12px;
  font-size: 14px;
`;

export const SignUpLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
