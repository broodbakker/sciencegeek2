import React, { FunctionComponent } from 'react'
//components
import { Layout } from "../../../components/layout"
import Pagination from '../../../components/pagination/index';
import { PostItem2 } from "../../../components/postItem"
import { SeoHeader } from "../../../components/seoHeader"
//functions
import { getPropsFromPaths, getSubjectPaths } from "../../../util/localFunctions/importPosts"
//typescript
import { PostMeta, FullPost } from "../../../typescript"
//constants
import { NET_BINNEN } from "../../../public/variables"
//data
import data from "../../../functions/postData.json"

const postMeta: PostMeta = JSON.parse(JSON.stringify(data));

type NetBinnenProps = {
  posts: FullPost[]
}

const NetBinnen: FunctionComponent<NetBinnenProps> = ({ posts }) => {
  return (
    <Layout>
      <SeoHeader subtitle="Het laatste nieuws" />
      <main>
        {/* net binnen */}
        <div className="mx-4 mt-10 mb-10 text-4xl font-bold underline text-grey">
          <h1>{NET_BINNEN().title}</h1>
        </div>

        {/* posts */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 pb-10 mt-2">
          {posts.map((post: FullPost, index) => <PostItem2 post={post} key={index} />)}
        </div>

        <Pagination />

      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getSubjectPaths(postMeta)
  return { paths, fallback: false };
}

type Params = {
  params: { id: string, subject: string }
}

// params will contain the id for each generated page.
export async function getStaticProps({ params: { subject, id } }: Params) {
  const posts = await getPropsFromPaths(subject, id)
  return { props: { posts } }
}

export default NetBinnen

