import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/authStore";
import apiClient from "@/services/axiosClient";

const CallbackPage = () => {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    if (!router.isReady) return;

    const processToken = async () => {
      const { access_token } = router.query;

      if (!access_token || typeof access_token !== "string") {
        console.error("Access token is missing or invalid");
        router.push("/"); // 토큰이 없으면 홈으로 이동
        return;
      }

      try {
        // 토큰 저장
        setAccessToken(access_token);
        apiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;

        // 처리 완료 후 홈으로 이동
        router.push("/");
      } catch (error) {
        console.error("Error processing access token:", error);
        router.push("/"); // 오류 발생 시 홈으로 이동
      }
    };

    processToken();
  }, [router]);

  return <p>처리 중입니다... 잠시만 기다려 주세요.</p>;
};

export default CallbackPage;
