import React, { ReactElement } from "react";
import MypageLayout from "@/components/Layout/MypageLayout";
import { NextPageWithLayout } from "../_app";
import Layout from "@/components/Layout/Layout";

const EditProfile: NextPageWithLayout = () => {
  return <p>개인정보 변경 ^^</p>;
};

EditProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <MypageLayout>{page}</MypageLayout>
    </Layout>
  );
};

export default EditProfile;
