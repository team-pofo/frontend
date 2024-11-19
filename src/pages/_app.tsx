import Layout from "@/components/Layout/layout";
import { store } from "@/stores";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import localFont from "next/font/local";

const myFont = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={myFont.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
