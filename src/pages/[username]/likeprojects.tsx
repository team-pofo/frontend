import React, { ReactElement } from "react";
import MypageLayout from "@/components/Layout/MypageLayout";
import Layout from "@/components/Layout/Layout";
import { NextPageWithLayout } from "../_app";

const LikeProjects: NextPageWithLayout = () => {
  return <p>좋아요한 프로젝트 ^^</p>;
};

LikeProjects.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <MypageLayout>{page}</MypageLayout>
    </Layout>
  );
};

export default LikeProjects;
