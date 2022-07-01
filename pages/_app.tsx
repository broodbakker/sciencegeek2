import React from 'react';
import 'tailwindcss/tailwind.css'
import { useRouter } from "next/router";
// Modules
import { AppProps } from 'next/app';
//state
import { IsMenuOpenProvider } from '../state/isMenuOpen'
import { IsSearchMenuOpenProvider } from '../state/isSearchMenuOpen'
//components
import { Layout } from '../components/layout';

import * as gtag from "../lib/gtag";
const isProduction = process.env.NODE_ENV === "production";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  React.useEffect(() => {
    // Remove the server-side injected CSS.

    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

  }, [router.events]);

  const Component1 = Component as any;

  return (
    <>
      <IsMenuOpenProvider>
        <IsSearchMenuOpenProvider>
          <Layout>
            <Component1 {...pageProps} />
          </Layout>
        </IsSearchMenuOpenProvider>
      </IsMenuOpenProvider>
    </>
  );
};

export default MyApp;