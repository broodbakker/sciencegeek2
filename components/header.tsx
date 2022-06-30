
import Nav from './nav';
import Link from "next/link";
import { FaSearch, FaBars } from 'react-icons/fa';

import { useIsMenuOpen } from '../state/isMenuOpen'
import { useIsSearchMenuOpen } from '../state/isSearchMenuOpen'

export const Header = () => {
  const { dispatch, state } = useIsMenuOpen()
  const { dispatchMenu, state: { isSearchMenuOpen } } = useIsSearchMenuOpen()

  const isMenuOpen = state.isMenuOpen
  const menuAction = isMenuOpen ? "close" : "open"
  const SearchmenuAction = isSearchMenuOpen ? "close" : "open"


  const handleClickSearch = () => {
    dispatchMenu({ type: SearchmenuAction })
    dispatch({ type: "close" })
  }

  const handleClickMenu = () => {
    dispatch({ type: menuAction })
    dispatchMenu({ type: "close" })
  }
  return (
    <header className="sticky top-0 z-20 bg-purple">
      <section className="mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 justify-between max-w-screen-lg mx-auto px-4 h-16 md:h-20 ">

          <div className="hidden md:block"></div>

          {/* logo naam small*/}
          <Link href="/">

            <a className="relative my-auto md:text-center hidden sm:block md:flex md:mx-auto focus:outline-none focus:ring focus:border-blue-300">
              <div className="my-auto md:text-center">
                <div className="my-auto md:text-center"> <h2 className="text-4xl text-white md:text-5xl  font-black ">Science<strong className="text-yellow">Geek</strong></h2>
                  <div className="hidden md:block text-almostWhite">het beste wetenschappelijke nieuws</div></div>
              </div>

              {/* logo */}
              <div className="absolute -top-6 -right-16 h-32 hidden md:inline-block ">
                <img
                  className="h-32 cursor-pointer "
                  alt="logo science geek"
                  src={`/sciencegeeklogo.png/?nf_resize=fit&h=${4 * 32}`}
                />
              </div>

            </a>
          </Link>

          {/* logo naam big*/}
          <Link href="/">
            <a className="my-auto sm:hidden focus:outline-none focus:ring focus:border-blue-300">
              <h2 className="text-2xl text-white md:text-5xl  font-black ">Science<strong className="text-yellow">Geek</strong></h2>
              <span className="hidden md:block text-almostWhite">het beste wetenschappelijke nieuws</span>
            </a>
          </Link>


          {/* logo big*/}
          <Link href="/" passHref>
            <a className="h-20 left-44 sm:left-64 sm:h-24 sm:h-16 sm:-top-2 absolute m-auto md:hidden focus:outline-none focus:ring focus:border-blue-300">
              <img
                className="cursor-pointer h-20"
                alt="logo science geek"
                src={`/sciencegeeklogo.png/?nf_resize=fit&h=${4 * 32}`}
              />
            </a>
          </Link>


          <div className="flex my-auto justify-end">
            <div className="flex my-auto cursor-pointer" onClick={handleClickSearch}>

              {/* search icon small */}
              <div className="flex items-center justify-content mr-4 md:hidden focus:outline-none focus:ring focus:border-blue-300">
                <FaSearch size="2em" color="white" />
              </div>

              {/* bar icon small */}
              <div className="flex items-center justify-content mr-1 hidden md:block">
                <FaSearch color="white" size="2.5em" />
              </div>

              <div className="text-white my-auto text-lg md:text mr-4 hidden md:block">Zoeken</div>
            </div>



            <div className="flex my-auto cursor-pointer " onClick={handleClickMenu}>

              {/* search icon big */}
              <div className="flex items-center justify-content mr-1 md:hidden">
                <FaBars color="white" size="2em" />
              </div>

              {/* bar icon big */}

              <div className="flex items-center justify-content mr-1 hidden md:block">
                <FaBars color="white" size="2.5em" />
              </div>

              <span className="text-white text-lg my-auto md:text">Menu</span>


            </div>


          </div>
        </div>
      </section>
      <Nav />
    </header >
  )
}

