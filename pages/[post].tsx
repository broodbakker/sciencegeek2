import React, { FunctionComponent } from 'react'
import styled from "styled-components"
import ReactHtmlParser from 'react-html-parser';
//functions
import { importPostSlugs, getFullPost, getRandomPostBySubject } from "../util/localFunctions/importPosts"
import { imageResize, splitHtml, makeMdFileExt } from "../util/localFunctions/helperFunc"
//components
import { Layout } from "../components/layout"
import { PostItem } from "../components/postItem"
import { SeoHeader } from '../components/seoHeader';

//typescript
import { FullPost, PostMeta } from "../typescript"
//data
import data from "../functions/postData.json"
const postMeta: PostMeta = JSON.parse(JSON.stringify(data));

const makePostParam = (slug: string) => ({
  params: { post: slug },
})

const Container = styled.div`
  & > p {
    & > img {
      width:100%;
      max-width: 42rem;
      margin:2em auto;
    }
  }
  `

const Img = styled.img`
    margin:2em auto;
`

const transformImage = (node: any) => {
  if (node.name === 'img') {
    const image = node.attribs.src
    const alt = node.attribs.alt
    const titleBron = node.attribs.title

    return (
      <>

        <div className="relative w-full md:max-w-4xl md:mt-10 md:mx-auto mb-4">
          <div className="relative m-auto md:max-w-2xl">
            <Img
              src={image}
              alt={alt}
            />
          </div>
          <div className="relative -top-10 md:-top-12 w-full m-auto">
            <div className="sm:w-9/12 mb-4 m-auto">
              <div className="z-10 text-grey text-small text-sm mt-0 pm">bron: {titleBron}</div>
              <div className="z-10 text-gray-800  text-lg font-medium italic m-0">{alt}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

type PostProps = {
  post: FullPost
  randomPosts: FullPost[]
}

const Post: FunctionComponent<PostProps> = ({ post, randomPosts }) => {
  const { photos, html, title, subtitle, tags } = post
  //const image = imageResize(photos.headerData.image)
  const image = photos.headerData.image

  const { firstPart, secondPart } = splitHtml(3, html)

  return (
    <Layout>
      <SeoHeader subtitle={post.title} />
      <main className="md:max-w-6xl  md:mx-auto">

        <div className="relative w-full h-72 md:max-w-4xl md:h-96 md:mt-10 md:mx-auto">
          <div className="relative w-full h-full md:w-8/12 m-auto">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="md:w-8/12 m-auto mb-4">
            <p className="z-10 text-grey text-small text-sm">bron: {photos.headerData.bron}</p>
          </div>
        </div>

        <div className="p-4 md:mb-4">
          <div className=" mb-6 mt-4 md:mt-8 md:max-w-xl md:mx-auto">
            <header>
              <h1 className="text-3xl mb-2 font-bold text-black md:text-4xl md:max-w-xl md:mx-auto">{title}</h1>
              {subtitle && <h2 className="italic text-xl text-black mb-4 md:text-2xl md:max-w-xl md:mx-auto">{subtitle}</h2>}
            </header>

          </div>

          <div className="mb-6 text-xl mx-auto">
            <Container className="prose-xl md:prose-2xl mx-auto" >
              {ReactHtmlParser(firstPart, { transform: transformImage })}
            </Container>
          </div>
          {photos.photosData.length !== 0 && <div className="relative w-full md:max-w-4xl md:mt-10 md:mx-auto mb-4">
            <div className="relative m-auto md:max-w-2xl">
              <img
                src={photos.photosData[0].image}
                alt={title}
                className=""
              />
            </div>
            <div className="w-full m-auto">
              <div className="sm:w-9/12 mb-4 m-auto">

                <p className="z-10 text-grey text-small text-sm">bron: {photos.photosData[0].bron}</p>

                <p className="z-10 text-gray-800  text-lg font-medium italic">{photos.photosData[0].onderschrift}</p>
              </div>
            </div>
          </div>}

          <Container className="prose-xl md:prose-2xl mx-auto" >
            {ReactHtmlParser(secondPart, { transform: transformImage })}
          </Container>
        </div>
        <div className="mx-2">

          {tags && <ul className="flex flex-wrap mb-6 gap-y-2 mb-20">
            {tags.map((tag: string) => {
              return (
                <li className="text-purple font-bold p-2 border-2 border-purple rounded-md mr-4 whitespace-nowrap">{tag}</li>)
            })}
          </ul>}
        </div>

        <section>
          <div className="mb-12 mx-2">
            <span className="p-4 text-white bg-yellow">lees ook</span>
          </div>

          <div className="flex flex-wrap overflow-hidden my-4 mx-2 max-w-3xl">
            {randomPosts.map((post: FullPost) => <PostItem post={post} />)}
          </div>
        </section>
      </main>
    </Layout >
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