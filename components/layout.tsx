
import React, { FunctionComponent } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router'
//components
import { Header } from "./header"
import { MenuSlider } from '../components/menuSlider';
import { SearchPage } from '../components/search/searchPage';
//state
import { useIsMenuOpen } from '../state/isMenuOpen'
import { useIsSearchMenuOpen } from '../state/isSearchMenuOpen'

type LayoutProps = {
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const router = useRouter()

  const { dispatch, state } = useIsMenuOpen()
  const { dispatchMenu, state: { isSearchMenuOpen } } = useIsSearchMenuOpen()

  const handleRouteChange = () => {
    dispatch({ type: "close" })
    dispatchMenu({ type: "close" })
  }

  React.useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, []);

  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <div className="relative">
        <Header />
        <div className="relative overflow-hidden">
          <MenuSlider />
          <div className="hidden md:block h-10 w-full bg-almostWhite"></div>
          {isSearchMenuOpen ?
            <SearchPage /> :
            <div className="max-w-screen-lg mx-auto">
              {children}
            </div>}
        </div>
      </div>
    </>
  )
}