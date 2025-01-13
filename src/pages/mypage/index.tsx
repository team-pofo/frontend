import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Mypage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // 기본 경로에서 myprojects로 리다이렉트
    router.replace("/mypage/myprojects");
  }, [router]);

  return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
};

export default Mypage;
