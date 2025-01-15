import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

export default function Mypage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!hasAlerted.current) {
      hasAlerted.current = true;

      if (isLoggedIn) {
        router.replace("/mypage/myprojects");
      } else {
        alert("로그인이 필요합니다");
        router.replace("/");
      }
    }
  }, [isLoggedIn, router]);

  return null;
}
