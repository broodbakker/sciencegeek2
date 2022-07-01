import React, { FunctionComponent } from 'react'
import styled from "styled-components"
import ReactHtmlParser from 'react-html-parser';
//functions
import { importPostSlugs, getFullPost, getRandomPostBySubject, makePostParam } from "../util/localFunctions/importPosts"
import { imageResize, splitHtml, makeMdFileExt } from "../util/localFunctions/helperFunc"
//components
import { Layout } from "../components/layout"
import { PostItem } from "../components/postItem"
import { SeoHeader } from '../components/seoHeader';
import { PostPage } from "../components/templates/postPage"

//typescript
import { FullPost, PostMeta } from "../typescript"
//data
import data from "../functions/postData.json"

const postMeta: PostMeta = JSON.parse(JSON.stringify(data));

type PostProps = {
  post: FullPost
  randomPosts: FullPost[]
}

const Post: FunctionComponent<PostProps> = ({ post, randomPosts }) => {

  return (
    <>
      <SeoHeader subtitle={post.title} />
      <PostPage post={post} randomPosts={randomPosts} />
    </>
  );
};



export async function getStaticPaths() {
  const slugs = importPostSlugs(postMeta)


  const paths = slugs.map(makePostParam);

  return { paths, fallback: false };
}

// params will contain the id for each generated page.
type params = {
  params: { post: string }
  locales: any
  locale: any
  defaultLocale: any
}
export async function getStaticProps({ params }: params) {
  const slug = makeMdFileExt(params.post)
  const post: FullPost = await getFullPost(slug);

  const randomPosts: FullPost[] = await getRandomPostBySubject(4, post.onderwerp, postMeta)

  return {
    props: {
      post, randomPosts
    },
  };
}

export default Post