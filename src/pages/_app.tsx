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
  const { isLoggedIn, isAuthLoading } = useAuthStore();
  const router = useRouter();
  const hasAlerted = useRef(false);

  useEffect(() => {
    const protectedRoutes = ["/mypage"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      router.pathname.startsWith(route),
    );

    if (isProtectedRoute && !isAuthLoading) {
      if (!isLoggedIn) {
        if (!hasAlerted.current) {
          hasAlerted.current = true;
          alert("로그인이 필요합니다");
          router.replace("/");
        }
      }
    }
  }, [isLoggedIn, isAuthLoading, router]);

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
