import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mypage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/mypage/myprojects");
    } else {
      alert("로그인이 필요합니다");
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return null;
}
