import React from "react";
import MypageLayout from "@/components/Mypage/MypageLayout";
import MyProjectComponents from "@/components/Mypage/MyProjects/MyProjects";
import { useAuthStore } from "@/stores/authStore";
import { css, Global } from "@emotion/react";

const MyProjects: React.FC = () => {
  const { isLoggedIn } = useAuthStore();
  if (isLoggedIn) {
    return (
      <div>
        <Global
          styles={css`
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        />
        <MypageLayout>
          <MyProjectComponents />
        </MypageLayout>
      </div>
    );
  } else {
    return null;
  }
};

export default MyProjects;
