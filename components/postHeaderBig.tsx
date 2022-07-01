
import React, { FunctionComponent } from 'react'
import Link from "next/link";

//typescript
import { PostData } from "../typescript"

type PostProps = {
  post: PostData,
  url: string
}

export const Post: FunctionComponent<PostProps> = ({ url, post }) => {
  return (
    <Link href={`/${url}`} as={`/${url}`}>
      <a className="focus:outline-none focus:ring focus:border-blue-300">
        <div className="p-4 cursor-pointer">
          <div className="relative h-64 ">
            <img
              src={`${post.photos[0].image}/?nf_resize=fit&w=700`}
              alt={post.attributes.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-36 p-2 ">
            <div>
              <div className="text-yellow font-medium mb-2">{post.attributes.onderwerp}</div>
              <div className="text-black font-semibold text-2xl">{post.attributes.title}</div>
            </div>
            <div className="absolute w-12 bg-yellow h-0.5 bottom-0 right-0"></div>
            <div className="absolute w-0.5 bg-yellow h-12 bottom-0 right-0"></div>
          </div>
        </div>
      </a>
    </Link>
  )
}