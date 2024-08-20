import Navbar from "@/components/fragments/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Fira_Code } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const disabledNavbar = ["auth", "admin", "user"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={firaCode.className}>
        {!disabledNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        <Component {...pageProps} />;
      </div>
    </SessionProvider>
  );
}
