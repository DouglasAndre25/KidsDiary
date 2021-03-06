import React from "react";
import "../styles/globals.scss";
import Head from "next/head";
import { ThemeProvider } from "@mui/system";
import customTheme from "../core/theme";
import Header from "../components/Header";
import GlobalContext from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kids Diary</title>
      </Head>
      <ThemeProvider theme={customTheme}>
        <GlobalContext>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </GlobalContext>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
