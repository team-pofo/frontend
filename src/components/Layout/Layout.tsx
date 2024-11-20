import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { Content, LayoutContainer } from "./styles";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navigation />
      <Content>{children}</Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
