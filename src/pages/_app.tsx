import Layout from "@/components/Layout/Layout";
import { store } from "@/stores";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import localFont from "next/font/local";
import { ApolloProvider } from "@apollo/client";
import client from "@/libs/apolloClient";

const myFont = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={myFont.className}>
        <Layout>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Layout>
      </div>
    </Provider>
  );
}
