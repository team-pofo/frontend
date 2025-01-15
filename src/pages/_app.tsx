import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import "@/styles/mdeditor.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
const myFont = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  const { isLoggedIn } = useAuthStore();
  const hasAlerted = useRef(false);
  const router = useRouter();

  // "/mypage는 로그인된 상태에서만 접근할 수 있음"
  useEffect(() => {
    const protectedRoutes = ["/mypage"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      router.pathname.startsWith(route),
    );

    if (isProtectedRoute && !hasAlerted.current) {
      hasAlerted.current = true;

      if (!isLoggedIn) {
        alert("로그인이 필요합니다");
        router.replace("/");
      }
    }
  }, [isLoggedIn, router]);

  return (
    <div className={myFont.className}>
      <Layout>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Layout>
    </div>
  );
}
