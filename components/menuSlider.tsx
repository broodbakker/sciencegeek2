
import React, { FunctionComponent, useEffect } from 'react'
import { useIsMenuOpen } from '../state/isMenuOpen'

import { CgClose } from 'react-icons/cg';
import { IconContext } from "react-icons";

import { NAV_NAMES, NAV_LINKS } from "../public/variables"
import { useRouter } from 'next/router'
import Link from "next/link";

//hooks
import { useKeyPress } from "../util/hooks/useKeyPress"

export const MenuSlider = () => {
  const { state, dispatch } = useIsMenuOpen()

  const isEnterPressed = useKeyPress({
    key: "Escape",
  })

  useEffect(() => {
    if (isEnterPressed) {
      dispatch({ type: "close" })
    }
  }, [isEnterPressed])

  const switchClass = state.isMenuOpen ? "w-96 right-0" : "w-96 -right-96"

  return (
    <nav className={`fixed right-0 top-16 md:top-20 h-screen bg-white z-30 ${switchClass} transition-all duration-500 border-l border-almostWhite`}>

      <div className={`relative`}>

        <IconContext.Provider value={{ color: "", className: "", size: "2em", }}>
          <button aria-label="Close" className="absolute right-4 top-4" onClick={() => dispatch({ type: 'close' })}><CgClose /></button>
        </IconContext.Provider>
        {/* <Zoeken /> */}

        <div className="pt-12">
          {NAV_NAMES.map((navName, index) => {
            const path: string = useRouter().asPath
            const isRoute: boolean = path === NAV_LINKS[index]
            return <NavItem name={navName} path={NAV_LINKS[index]} isRoute={isRoute} key={index} />
          })}

          <Link href="/over-sciencegeek">
            <a onClick={() => dispatch({ type: 'close' })} className={` relative`} >
              <div className={`ml-4 text-2xl py-4 border-b border-almostWhite  `}>Over ScienceGeek</div>
            </a>
          </Link>

        </div>
      </div>
    </nav>
  );
};

type NavProps = {
  name: string,
  path: string,
  isRoute: boolean
}


const NavItem: FunctionComponent<NavProps> = ({ path, isRoute, name }) => {
  const { state, dispatch } = useIsMenuOpen()
  return (
    <Link href={path}>
      <a onClick={() => dispatch({ type: 'close' })} className={` relative ${isRoute && `bg-almostWhite flex`}`}>
        <div className={`ml-4 text-2xl py-4 border-b border-almostWhite  ${isRoute && `font-bold `}`}>{name}</div>
        {isRoute && <div className="absolute h-full w-2 left-0 bg-purple" />}

      </a>
    </Link>
  )
}


type ButtonProps = {

}

const Zoeken: FunctionComponent<ButtonProps> = () => {
  return (
    <div className="flex py-6 px-4 border-b border-t border-almostWhite">
      <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="instantie">

          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 py-3 " id="instantie" type="text" placeholder="zoek op trefwoord,titel of auteur" name="instantie" />
        </label>

      </div>


      <button aria-label="submit" className="bg-purple text-white text-xl
       font-bold py-1 px-2 rounded ml-1" type="submit">
        Zoek
      </button>

    </div>
  )
}

