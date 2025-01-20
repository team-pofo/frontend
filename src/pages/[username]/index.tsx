import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Mypage() {
  const router = useRouter();
  const { username } = router.query;
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(`/${username}/projects`);
    }
  }, [isLoggedIn, router]);

  return null;
}
