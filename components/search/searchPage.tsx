import { useEffect } from "react"

import { FormInput } from "./index"

import { useIsSearchMenuOpen } from '../../state/isSearchMenuOpen'

import { PostItem1 } from "../../components/postItem"

import { FaBackspace } from 'react-icons/fa';
import { IconContext } from "react-icons";

import { useKeyPress } from "../../util/hooks/useKeyPress"
import { useSearch } from '../../util/hooks/useSearch';

export const SearchPage = () => {
  const { setQuery, results, query } = useSearch()
  const { state, dispatchMenu } = useIsSearchMenuOpen()
  const isEnterPressed = useKeyPress({
    key: "Escape",
  })

  const handleChange = (e: any) => setQuery(e.target.value)


  useEffect(() => {
    if (isEnterPressed) {
      dispatchMenu({ type: "close" })
    }
  }, [isEnterPressed, results])

  const switchClass = state.isSearchMenuOpen ? "visible" : "hidden"

  return (
    <div className={`${switchClass} bg-white top-16 md:top-36 z-20 h-full w-full
   `}>

      {/* exit button */}
      <div className="flex my-auto justify-end px-4 sm:px-10 cursor-pointer" onClick={() => dispatchMenu({ type: "close" })}>
        <div className="flex my-auto">
          <div className="text-gray-600 my-auto text-lg md:text-xl mr-2 font-bold">Keer terug</div>
          <IconContext.Provider value={{ color: "grey", className: "", size: "3em", }}>
            <div className="">
              <FaBackspace />
            </div>
          </IconContext.Provider>
        </div>
      </div>

      <div className={`m-auto sm:px-10 md:max-w-6xl`}>
        <div className={`p-4`}>
          <FormInput type={"text"} handleChange={handleChange} value={query} />
        </div>

        {results && <div className="mt-8">{results.map((post: any, index: any) => {
          return (<PostItem1
            slug={post.slug} image={post.image} title={post.title} date={post.date} onderwerp={post.onderwerp} />)
        })} </div>}

      </div>
    </div>
  );
}


