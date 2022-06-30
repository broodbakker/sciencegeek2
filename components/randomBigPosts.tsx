import React, { FunctionComponent } from 'react'
//components
import { PostItem2 } from "../components/postItem"
//typescript
import { FullPost } from "../typescript"
import {RANDOM_BIG_POSTS}  from "../public/variables"

type RandomProps = {
  posts: FullPost[],
}

export const RandomBigPosts: FunctionComponent<RandomProps> = ({ posts }) => {
  return (
    <div>
      <div className="text-2xl mt-10 ml-4 font-bold text-grey hidden md:block">
        <h2 className="inline border-b border-almostWhite ">{RANDOM_BIG_POSTS.title}</h2>
      </div>

      <div className="hidden md:block md:grid  md:grid-cols-3 pb-10 mt-2">
        {posts.map((post: FullPost, id: number) =>  <PostItem2 post={post} key={id} />)}
      </div>
    </div>
  )
}