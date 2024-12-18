import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import "@/styles/mdeditor.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
const myFont = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={myFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
