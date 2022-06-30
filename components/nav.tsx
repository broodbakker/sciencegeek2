import React, { FunctionComponent } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router'

import { NAV_NAMES, NAV_LINKS } from "../public/variables"

const Nav = () => {
  return (
    <section className="bg-white flex justify-center border-b border-almostWhite">
      <nav className="flex overflow-x-auto divide-x  divide-almostWhite bg-white h-12 md:h-16 font-semibold text-black  max-w-6xl mx-auto">
        {NAV_NAMES.map((navName, index) => {
          const path: string = useRouter().asPath
          const isRoute: boolean = path === NAV_LINKS[index]
          return <NavItem name={navName} path={NAV_LINKS[index]} isRoute={isRoute} key={index} />
        })}
      </nav>
    </section>
  )
}


type NavProps = {
  name: string,
  path: string,
  isRoute: boolean
}

const NavItem: FunctionComponent<NavProps> = ({ path, isRoute, name }) => {
  return (
    <Link href={path}>
      <a className={`relative grid px-4 h-full z-20  ${isRoute && `bg-almostWhite `} focus:outline-none focus:ring focus:border-blue-300`}>
        <span className={`self-center md:text-lg ${isRoute && `font-bold `}`}>{name}</span>
        {isRoute && <div className="absolute w-full h-2 bottom-0 bg-purple" />}
      </a>
    </Link>
  )
}




export default Nav;
