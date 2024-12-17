import Layout from "@/components/Layout/Layout";
import { getUserInfo } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import "@/styles/globals.css";
import "@/styles/mdeditor.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

const myFont = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  const { setAccessToken, login } = useAuthStore();
  const [isClient, setIsClient] = useState(false); // 클라이언트 사이드 여부

  useEffect(() => {
    setIsClient(true); // 클라이언트 사이드에서만 true로 설정

    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const userInfo = await getUserInfo();
          setAccessToken(token);
          login(token, userInfo);
        } catch (error) {
          console.error("유저 정보 복구 실패:", error);
          localStorage.removeItem("accessToken");
        }
      }
    };

    fetchUserData();
  }, []);

  if (!isClient) return null; // 클라이언트가 아니면 아무것도 렌더링하지 않음

  return (
    <div className={myFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
