import BaseApp, { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../theme/styledTheme';

import 'antd/dist/antd.css';

class App extends BaseApp<AppProps> {
  public static async getInitialProps({ Component, ctx }: any) {
    // const { res, pathname } = ctx;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <NextSeo title="Oksana - Desserts" description="Desserts management" />
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            rel="icon"
            type="image/png"
            href="https://public-assets.develops.today/favicon.png"
          />
        </Head>

        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
