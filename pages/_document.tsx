import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from "../lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="nl" className="text-xs">
        <Head>
          {/* enable analytics script only for production */}
          {isProduction && (
            <>
               <meta name="theme-color" content={`#250352`} />
        {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          /> */}

        <title>ScienceGeek</title>

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/ico/sciencegeekLogo.ico" />

        <meta name="description" content="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws. Over onder andere fossielen,ruimtevaart, de zoektocht naar aliens, sex, psychologie, milieu en geschiedenis.
" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" rel="stylesheet" />
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

