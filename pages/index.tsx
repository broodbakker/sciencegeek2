import React, { FunctionComponent } from 'react'
//components
import { HomePage } from "../components/templates/homePage"
import { SeoHeader } from '../components/seoHeader';
//functions
import { getPosts, getRandomPosts, getFilesAmount } from "../util/localFunctions/importPosts";
//typescript
import { FullPost } from "../typescript"
//variables
import { POSTS_PATH } from "../public/variables"

type HomeProps = {
  latestPosts: FullPost[],
  randomPosts: FullPost[]
}

const Home: FunctionComponent<HomeProps> = ({ latestPosts, randomPosts }) => {
  return (
    <>
      <SeoHeader subtitle="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws." />
      <HomePage latestPosts={latestPosts} randomPosts={randomPosts} />
    </>
  )
}

export async function getStaticProps() {
  const latestPosts = await getFilesAmount(POSTS_PATH, 6)

  //const randomPosts = await getRandomPosts(4)



  return { props: { latestPosts, randomPosts: latestPosts } }
}

export default Home;