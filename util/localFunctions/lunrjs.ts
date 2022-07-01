import lunr from "lunr"

import React from "react"

import axios from 'axios'

type titles = {
  title: string
  tags: string[]
  slug: string
}

const modifyTitle = (s: string) => s.replaceAll(' ', '-')


import { FullPost } from "../../typescript"

export const createStore = (posts: any[]) => posts.reduce((acc, post) => {
  let { title, subtitle, image, slug } = post;
  return { ...acc, [title]: { title, subtitle, slug, image } };
}, {});



// export const getAllPosts = async (): Promise<titles[]> => {
//   const fileNames = getPostFileNames()
//   const posts = await getPostTitles(fileNames)

//   return posts
// }

// // const getPostTitles = async (fileNames: string[]) => {
// //   return Promise.all(
// //     fileNames.map(async path => {
// //       const markdown: any = await import(`./content/posts/${path}`);
// //       const title = markdown.attributes.title
// //       const tags = markdown.attributes.tags.join(" ");
// //       const content = markdown.html
// //       return { title, tags, content, slug: path.substring(0, path.length - 3) };
// //     })
// //   )
// // }

// const getPostFileNames = (): string[] => {
//   const Files = require.context('../content/posts', false, /\.md$/).keys()
//     .map(relativePath => relativePath.substring(2));
//   return Files
// }

// const createIndex = (posts: titles[]) => {

//   var idx = lunr(function () {
//     const lunrProp: any = lunr
//     this.field('tags', {
//       boost: 10
//     })
//     this.field("title", {
//       boost: 10
//     });
//     this.field("content");
//     this.ref('slug')

//     const datas = posts

//     datas.map((data: any) => {
//       this.add(data)
//     })
//   })

//   return idx
// }

// export const getSearchData = async () => {
//   const posts = await getAllPosts()
//   const index = createIndex(posts)

//   return { index, posts1: posts }
// }

// export const useFetch = (url: any) => {
//   const [response, setResponse] = React.useState(null);
//   const [error, setError] = React.useState(null);
//   React.useEffect(() => {
//     const fetchData = async () => {

//       try {

//         const res: any = await axios.get(url)

//         setResponse(res)
//       } catch (error: any) {
//         setError(error);
//       }
//     };
//     fetchData();
//   }, [url]);
//   return { response, error };
// };

