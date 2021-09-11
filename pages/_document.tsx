import BaseDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class Document extends BaseDocument {
  public static async getInitialProps(ctx: any) {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => {
            const StyledApp = styledComponentsSheet.collectStyles(
              <App {...props} />,
            );

            return StyledApp;
          },
        });

      const initialProps = await BaseDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  public render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          {/* Maven Pro and Ubuntu fonts loading from Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Maven+Pro:400,500,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
