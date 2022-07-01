
import React, { FunctionComponent } from 'react'
import Link from "next/link";
//constants
import { TIME_TILL_HIDDEN_BG } from "../public/variables"
//hooks
import useTimeLeft from "../util/hooks/useTimeLeft"
//typescript
import { FullPost } from "../typescript"

type HeadPostProps = {
  post: FullPost,
}

export const HeadPost: FunctionComponent<HeadPostProps> = ({ post }) => {
  const timeLeft = useTimeLeft(TIME_TILL_HIDDEN_BG)


  return (
    <Link href={`/${post.slug}`} as={`/${post.slug}`}>
      <a className="focus:outline-none">
        <article className="relative w-full h-72 md:max-w-4xl md:h-96  md:mx-auto cursor-pointer">

          <div className="relative w-full h-full ">
            <div className="absolute z-10 bottom-0 m-4">
              <h2 className="text-shadow text-white text-4xl md:text-5xl">{post.title}</h2>
            </div>

            {timeLeft !== 0 && <div className="absolute inset-0 w-full bg-loadingImage"></div>}
            <picture>
              <img
                src={`${post.photos[0].image}`}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </picture>

          </div>
        </article>
      </a>
    </Link>
  )
}