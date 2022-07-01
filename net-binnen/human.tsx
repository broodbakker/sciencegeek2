export { }
// import React, { FunctionComponent } from 'react'
// //components
// import { SubjectPage } from "../components/templates/subjectPage"
// import { SeoHeader } from '../components/seoHeader';
// //functions
// import { getPosts, getRandomPosts } from "../util/localFunctions/importPosts";
// //typescript
// import { FullPost } from "../typescript"
// type Human = {
//   latestPosts: FullPost[],
//   randomPosts: FullPost[]
//   subject: string
// }
// const Human: FunctionComponent<Human> = ({ latestPosts, randomPosts, subject }) => {
//   return (
//     <>
//       <SeoHeader subtitle="ScienceGeek brengt internationaal en binnenlands wetenschappelijk nieuws. | Human" />
//       <SubjectPage latestPosts={latestPosts} randomPosts={randomPosts} subject={subject} />
//     </>

//   )
// }

// export async function getStaticProps() {


//   //const randomPosts = await getRandomPosts(1)

//   const latestPosts = await getPosts(1, "quirky")

//   // const randomPosts = await getRandomPosts(AMOUNT_OF_RANDOM_POST_FRONTPAGE)
//   return { props: { latestPosts, randomPosts: latestPosts, subject: "human" } }
// }

// export default Human;