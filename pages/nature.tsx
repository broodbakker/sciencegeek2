import React, { FunctionComponent } from 'react'
//components
import { SubjectPage } from "../components/templates/subjectPage"
import { SeoHeader } from '../components/seoHeader';
//functions
import { getPosts, getRandomPosts } from "../util/localFunctions/importPosts";
//typescript
import { FullPost } from "../typescript"
type Nature = {
  latestPosts: FullPost[],
  randomPosts: FullPost[]
  subject: string
}
const Nature: FunctionComponent<Nature> = ({ latestPosts, randomPosts, subject }) => {
  return (
    <>
      <SeoHeader subtitle="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws. | Nature" />
      <SubjectPage latestPosts={latestPosts} randomPosts={randomPosts} subject={subject} />
    </>

  )
}

export async function getStaticProps() {


  const randomPosts = await getRandomPosts(4)

  const latestPosts = await getPosts(1, "quirky")

  // const randomPosts = await getRandomPosts(AMOUNT_OF_RANDOM_POST_FRONTPAGE)
  return { props: { latestPosts, randomPosts, subject: "nature" } }
}

export default Nature;