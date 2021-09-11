import BaseApp, { AppProps } from 'next/app';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import * as R from 'ramda';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { parseCookies } from 'nookies';

import { theme, GlobalStyle } from '../theme/styledTheme';

import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

const UnauthenticatedRoutes = ['/'];

const checkIsUnauthenticatedRoute = (r: string) =>
  UnauthenticatedRoutes.indexOf(r) !== -1;

class App extends BaseApp<AppProps> {
  public static async getInitialProps({ Component, ctx }: any) {
    const { res, pathname } = ctx;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const token = R.propOr(null, 'token', parseCookies(ctx));
    const user = R.propOr(null, 'user', parseCookies(ctx));
    const isUnauthenticatedRoute = checkIsUnauthenticatedRoute(pathname);

    if (
      res &&
      token &&
      user &&
      isUnauthenticatedRoute &&
      typeof res.writeHead === 'function'
    ) {
      res.writeHead(302, { Location: '/desserts' });
      res.end();
    }

    if (
      res &&
      !token &&
      !isUnauthenticatedRoute &&
      typeof res.writeHead === 'function'
    ) {
      res.writeHead(302, {
        Location: '/',
      });
      res.end();
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

        <ToastContainer />

        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default App;
