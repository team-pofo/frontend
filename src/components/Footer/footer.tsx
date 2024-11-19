// components/Footer.tsx
import React from "react";
import { FooterContainer } from "./Styles";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>© 2024 POFO. All rights reserved.</p>
      <p>Contact us at admin@pofo.kr</p>
    </FooterContainer>
  );
};

export default Footer;
