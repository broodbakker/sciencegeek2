import React, { FunctionComponent } from 'react'
//components
import { HeadPost } from "../headPost"
import { LaatsteNieuws } from "../laatsteNieuws"
import { RandomBigPosts } from "../randomBigPosts"
//functions
import { getFirstElement, removeFirstEement } from "../../util/localFunctions/helperFunc";
//typescript
import { FullPost } from "../../typescript"
//variables
import { LAATSTE_NIEUWS } from "../../public/variables"

interface IHomePage {
  latestPosts: FullPost[]
  randomPosts: FullPost[]
}

export const HomePage: FunctionComponent<IHomePage> = ({ latestPosts, randomPosts }) => {
  return (
    <main>
      <div>
        <div className="md:grid  md:grid-cols-2 md:mt-10">
          HeadPost
          <HeadPost post={getFirstElement(latestPosts)} />
          <div className="md:hidden h-2 w-full bg-almostWhite"></div>

          {/* laatste nieuws */}
          <LaatsteNieuws
            posts={removeFirstEement(latestPosts)}
            title={LAATSTE_NIEUWS.title}
            LinkNaarMeerPostsText={LAATSTE_NIEUWS.linkText}
            LinkNaarMeerPosts={LAATSTE_NIEUWS.link} />
        </div>

        <div className="hidden md:block bg-almostWhite h-0.5 w-full mt-8"></div>


        <RandomBigPosts posts={randomPosts} />
      </div >
    </main >
  )
}



