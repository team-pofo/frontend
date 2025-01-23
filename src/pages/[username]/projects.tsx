import React, { ReactElement } from "react";
import MypageLayout from "@/components/Layout/MypageLayout";
import MyProjectComponents from "@/components/Mypage/MyProjects/MyProjects";
import { useAuthStore } from "@/stores/authStore";
import { css, Global } from "@emotion/react";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout/Layout";

const MyProjects: NextPageWithLayout = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    return <MyProjectComponents />;
  } else {
    return null;
  }
};

MyProjects.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <MypageLayout>{page}</MypageLayout>
    </Layout>
  );
};

export default MyProjects;
