import React, { FunctionComponent } from 'react'
//components
import { HeadPost } from "../../components/headPost"
import { LaatsteNieuws } from "../../components/laatsteNieuws"
import { RandomBigPosts } from "../../components/randomBigPosts"

//functions
import { getFirstElement, removeFirstEement } from "../../util/localFunctions/helperFunc";
//typescript
import { FullPost } from "../../typescript"
//variables
import { LAATSTE_NIEUWS } from "../../public/variables"

interface ISubjectPage {
  latestPosts: FullPost[],
  randomPosts: FullPost[],
  subject: string
}
export const SubjectPage: FunctionComponent<ISubjectPage> = ({ latestPosts, randomPosts, subject }) => {

  const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) =>
    obj[key];


  return (
    // <SeoHeader subtitle="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws. | Subject" />
    <main>
      <div>

        <div className="md:grid  md:grid-cols-2 md:mt-10">

          {/* HeadPost */}
          <HeadPost post={getFirstElement(latestPosts)} />
          <div className="md:hidden h-2 w-full bg-almostWhite"></div>

          {/* laatste nieuws */}
          <LaatsteNieuws
            posts={removeFirstEement(latestPosts)}
            title={LAATSTE_NIEUWS[subject].title}
            LinkNaarMeerPostsText={LAATSTE_NIEUWS[subject].linkText}
            LinkNaarMeerPosts={LAATSTE_NIEUWS[subject].link} />
        </div>

        <div className="hidden md:block bg-almostWhite h-0.5 w-full mt-8"></div>
        {/* random posts */}
        <RandomBigPosts posts={randomPosts} />

      </div>
    </main>
  )
}

