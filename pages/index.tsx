import React, { FunctionComponent } from 'react'
//components
import { HomePage } from "../components/templates/homePage"
import { SeoHeader } from '../components/seoHeader';
//functions
import { getPosts, getRandomPosts } from "../util/localFunctions/importPosts";
//typescript
import { FullPost } from "../typescript"
//variables
import { AMOUNT_OF_POST_FRONTPAGE, AMOUNT_OF_RANDOM_POST_FRONTPAGE, LAATSTE_NIEUWS } from "../public/variables"

type HomeProps = {
  latestPosts: FullPost[],
  randomPosts: FullPost[]
}

const Home: FunctionComponent<HomeProps> = ({ latestPosts, randomPosts }) => {
  return (
    <>

      {/* <SeoHeader subtitle="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws." />
      <HomePage latestPosts={latestPosts} randomPosts={randomPosts} /> */}
    </>
  )
}

export async function getStaticProps() {
  console.log("test")
  const latestPosts = await getPosts(AMOUNT_OF_POST_FRONTPAGE)

  const test = await import(`../content/posts/extreem-andersdenkende-heeft-moeite-met-onzekerheid.md`)

  console.log(test)

  // console.log("latestPosts", latestPosts)
  // const randomPosts = await getRandomPosts(AMOUNT_OF_RANDOM_POST_FRONTPAGE)
  return { props: { a: 4 } }
}

export default Home;