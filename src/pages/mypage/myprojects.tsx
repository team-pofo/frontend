import React from "react";
import MypageLayout from "@/components/Mypage/MypageLayout";
import MyProjectComponents from "@/components/Mypage/MyProjects";

const MyProjects: React.FC = () => {
  return (
    <MypageLayout>
      <MyProjectComponents />
    </MypageLayout>
  );
};

export default MyProjects;
