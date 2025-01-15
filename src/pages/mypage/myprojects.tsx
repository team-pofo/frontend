import React from "react";
import MypageLayout from "@/components/Mypage/MypageLayout";
import MyProjectComponents from "@/components/Mypage/MyProjects/MyProjects";
import { useAuthStore } from "@/stores/authStore";

const MyProjects: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    return (
      <MypageLayout>
        <MyProjectComponents />
      </MypageLayout>
    );
  } else {
    return null;
  }
};

export default MyProjects;
