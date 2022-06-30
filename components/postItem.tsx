import React, { FunctionComponent } from 'react'
import Link from "next/link";
//hooks
import useTimeLeft from "../hooks/useTimeLeft"
//typescript
import { FullPost } from "../typescript"
import { formatDate } from "../util/localFunctions/formatdate"
//constants
import { TIME_TILL_HIDDEN_BG } from "../public/variables"

type PostProps = {
  post: FullPost,
}

export const PostItem: FunctionComponent<PostProps> = ({ post }) => {
  const timeLeft = useTimeLeft(TIME_TILL_HIDDEN_BG)

  const image = post.photos.headerData.image
  const image1 = `img/meisje-gitaar-vrolijk.jpg`
  return (
    <Link href={`/${post.slug}`} as={`/${post.slug}`}>
      <a className="w-full focus:outline-none flex-shrink-0">
        <article className="w-full mb-4 cursor-pointer">
          <div className="flex h-24 border-b border-almostWhite">
            <div className="relative flex-none h-full w-32">

              {timeLeft !== 0 && <div className="absolute inset-0 w-full h-full object-contain bg-loadingImage"></div>}

              <img
                src={image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative px-2">
              <span className="text-sm text-purple">
                {post.onderwerp}
              </span>

              <h2 className="text-lg font-medium leading-6">
                {post.title}
              </h2>

            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

type postProps1 = {
  slug: string,
  image: string,
  title: string
  onderwerp: string
  date: any
}


export const PostItem1: FunctionComponent<postProps1> = ({ slug, image, title, onderwerp, date }) => {
  const newDate: string = formatDate(date)

  const timeLeft = useTimeLeft(3)
  return (
    <Link href={`/${slug}`} as={`/${slug}`}>
      <a className="w-full focus:outline-none focus:ring focus:border-blue-300">
        <article className="w-full mb-4 cursor-pointer">
          <div className="flex h-24 border-b border-almostWhite">
            <div className="relative flex-none h-full w-32">

              {timeLeft !== 0 && <div className="absolute inset-0 w-full h-full object-cover bg-loadingImage"></div>}

              <img
                src={`${image}`}
                alt="title van artikel"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative px-2">
              <span className="text-sm font-thin text-purple">
                {onderwerp}
              </span>

              <h2 className="text-lg font-medium leading-6">
                {title}
              </h2>
              <time className="absolute bottom-1 text-xs text-grey"> {newDate}</time>
            </div>
          </div>
        </article>
      </a>
    </Link>

  )
}

type postProps2 = {
  post: FullPost
}

export const PostItem2: FunctionComponent<postProps2> = ({ post }) => {
  const timeLeft = useTimeLeft(TIME_TILL_HIDDEN_BG)

  return (
    <Link href={`/${post.slug}`} as={`/${post.slug}`}>
      <a className="focus:outline-none focus:ring focus:border-blue-300">
        <article className="m-4 cursor-pointer">
          <div className="relative h-64">

            {timeLeft !== 0 && <div className="absolute inset-0 w-full h-full object-cover bg-loadingImage"></div>}

            <img
              src={`${post.photos.headerData.image}`}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-36 p-2 ">
            <div>
              <span className="text-purple font-bold mb-2">{post.onderwerp}</span>
              <div className="text-black font-semibold text-2xl">{post.title}</div>
            </div>
            <div className="absolute w-12 bg-yellow h-0.5 bottom-0 right-0"></div>
            <div className="absolute w-0.5 bg-yellow h-12 bottom-0 right-0"></div>
          </div>
        </article>
      </a>
    </Link>
  )
}
