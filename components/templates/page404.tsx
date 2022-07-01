import React from 'react'
import Link from "next/link";
//components

//variables
import { PAGE404 } from "../../public/variables"

export const Page404 = () =>
  <main>
    <div className="mt-16 mx-8">

      <img src="404.png" className="mx-auto mb-8"></img>
      <div className="text-center">

        <h2 className="text-2xl font-bold mb-4 md:text-3xl">{PAGE404().title}</h2>
        <p className="text-lg mb-4 md:text-2xl">{PAGE404().subtitle}</p>
        <div className="">
          <Link href="/" >
            <button aria-label="Return" className="bg-purple text-white text-xl
       font-bold py-2 px-3 rounded ml-1 self-center " >
              {PAGE404().textLink}
            </button>
          </Link>
        </div>
      </div>
    </div>
  </main>

