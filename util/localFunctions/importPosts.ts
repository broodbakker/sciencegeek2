import * as R from "ramda";

import fs from 'fs'
import { join } from 'path';
import matter from 'gray-matter';

//typescript
import { PostData, PostMeta, photoData, Import, FullPost, SpecificPhotos, SpecificPhotos1, Num, Point, Point1 } from "../../typescript"
//helper
import { convertNumberToArray, getShuffle } from "./helperFunc"
import { NUMBER_OF_POST_ON_PAGE } from "../../public/variables"
//functions
import { modifyTags } from "./modifyTags"
//data
import data from "../../functions/postData.json"
const postMeta: PostMeta = JSON.parse(JSON.stringify(data));
//constants
import { POSTS_PATH, PHOTOS_PATH } from "../../public/variables"

export const importMdFiles = (filePath: string) => fs
  .readdirSync(filePath)
  // Remove file extensions for page paths
  .map((path) => path.replace(/\.md?$/, ''))
  // Map the path into the static paths object required by Next.js
  .map((slug) => ({ params: { slug } }));

export const getFiles = (path: string) => importSlugs(path).map((slug) => getFullPost(addMdExt(slug)))

export const getFilesForSearchIndex = (path: string) => importSlugs(path).map((slug) => getFileBySlug(slug, path))

export const getFilesAmount = (path: string, amountOfFiles: number) => getFiles(path).slice(-amountOfFiles);

const importSlugs = (filePath: string) =>
  fs.readdirSync(filePath)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))

const putSlugInData = (slug: string, product: any) => ({ ...product, slug })

export const getFilesByPath = (slugs: string[], path: string) =>
  slugs.map((slug) => getFileByPath(slug, path))


export const getFileBySlug = (
  slug: string,
  Path: string
): any => {

  const filePath = join(Path, `${slug}`);

  const fileContents = fs.readFileSync(filePath);

  return matter(fileContents);

};

export const getPhotoByPath = (
  slug: string,
  Path: string
): any => {

  const filePath = join(Path, `${slug}.md`);


  const fileContents = fs.readFileSync(filePath);

  return matter(fileContents);

};

export const getFileByPath = (
  slug: string,
  path: string
): any => {

  const filePath = join(path, `${slug}`);

  const fileContents = fs.readFileSync(filePath);

  return matter(fileContents);

};

const changeDate = (date: Date) => date.toLocaleDateString()

// export const importPost = async (path: string): Promise<PostData> => {
//   const post = await import(`../content/posts/${path}`)
//   return post
// }

// export const importPhoto = async (path: string): Promise<Import> =>
//   await import(`../content/${"photo's"}/${path}.md`)

const importPhoto = (obj: string): any => {
  const photo = getPhotoByPath(obj, PHOTOS_PATH)
  return photo.data
}

export const importPhotos = (paths: string[]) =>
  paths.map((path) => importPhoto(path))

const getSubsetPosts = (files: string[], numberOfPosts: number,) => files.slice(0, numberOfPosts);

export const getPosts = (amountOfPosts: number, sortSubject: string = "all") => {

  const postsSortedBySubject = sortSubject === "all" ? data.FileNames : postMeta.postPerSubject[sortSubject]

  const sortedSlugsByData = sortPostsByDate(postsSortedBySubject)

  const slugs = getSubsetPosts(sortedSlugsByData, amountOfPosts)

  return slugs.map(getFullPost)
}

const importPosts = (postNames: string[]): Promise<FullPost[]> =>
  Promise.all(postNames.map(getFullPost))


const addMdExt = (s: string) => `${s}.md`
const removeMdExt = (slug: string) => slug.substring(0, slug.length - 3)

export const getFullPost = (slug: string) => {
  const post = getFileBySlug(slug, POSTS_PATH)

  const headPhotoFileName = postMeta.postMeta[slug].headerPhoto

  const tag = post.data.tags ? post.data.tags : []

  const headPhoto = importPhoto(headPhotoFileName)

  return modifyPost(post, [headPhoto], slug, tag)
}

const modifyPost = (post: any, photos: photoData[], slug: string, tag: any[]): FullPost => ({
  title: post.data.title,
  subtitle: post.data.Subtitle || "",
  date: changeDate(post.data.date),
  onderwerp: post.data.onderwerp,
  auteur: post.data.auteur,
  tags: modifyTags(tag),
  html: post.content,
  photos,
  slug: removeMdExt(slug)
})



const getNumberOfPages1 = (subjectName: string) => convertNumberToArray(getNumberOfPages(subjectName))

const getSubjectPath = (subjectName: string) => getNumberOfPages1(subjectName).map((arr: number) => ({
  params: {
    subject: subjectName,
    id: (arr + 1).toString(),
  }
}))

export const getSubjectPaths = ({ subjectNames }: PostMeta) =>
  [...subjectNames.map(getSubjectPath), getSubjectPath("all")].flat()

export const getPropsFromPaths = (slugName: string, slugId: string) => {
  const sortedSlugs = sortPostsByDate(sortPostsBySubject(slugName, postMeta))

  const specificPosts = getSpecificPosts(sortedSlugs, postNumbers(slugId))

  return importPosts(specificPosts)
}

const postNumbers = (slugId: string) => (
  {
    start: Number(slugId) * NUMBER_OF_POST_ON_PAGE - NUMBER_OF_POST_ON_PAGE,
    end: Number(slugId) * NUMBER_OF_POST_ON_PAGE
  })

const sortPostsBySubject = (slugName: string, postMeta: any) =>
  slugName === "all" ? postMeta.FileNames : postMeta.postPerSubject[slugName]



const getSpecificPosts = (slugs: string[], num: Num) =>
  (num.start > slugs.length) ? slugs.slice(num.start) : slugs.slice(num.start, num.end)

const getRandomNumbers = (total: number, amountOfPicks: number) => {
  if (amountOfPicks > total) return []

  const shuffle = getShuffle(convertNumberToArray(total));

  return convertNumberToArray(amountOfPicks).map(() => shuffle.next().value)
}



const nameLens = R.lensProp<Point>('name')
const dateLens = R.lensProp<Point>('date');

const view1 = R.view(nameLens)
const view2 = R.view(dateLens)

const double = (obj: any) => {
  const name = view1(obj)
  const date = view2(obj)

  return { name, date }
}

const triple = (array: any) =>
  view1(array)


const funcMap = (slug: string) => {
  const Lprop = R.lensProp<Point1>(slug)

  return R.view(Lprop, postMeta.postMeta)

}

const sortByNameCaseInsensitive = R.sortBy((R.prop('date')))

const sortPostsByDate = (slugs: string[]) => {
  const tas = R.map(funcMap, slugs)

  const r = R.map(double, tas)

  const s = sortByNameCaseInsensitive(r)

  const ra = R.map(triple, s)

  return R.reverse(ra)
}

const getRandomPaths = (amountOfPosts: number, totalPosts: number, postsBySubject: string[]) => {

  return getPaths(getRandomNumbers(totalPosts, amountOfPosts), postsBySubject)
}


const getPaths = (PostNumbers: number[], AllPostPaths: string[]) =>
  PostNumbers.map((postNumber) => AllPostPaths[postNumber])

export const getRandomPostBySubject = (amountOfPosts: number, subject: string, postMeta: PostMeta) => {
  const paths = getRandomPaths(amountOfPosts, postMeta.postPerSubject[subject].length, postMeta.postPerSubject[subject])

  return importPosts(paths)
}

export const getRandomPosts = (numberOfPost: number = 1) => {
  const paths = getRandomPaths(numberOfPost, postMeta.amountOfPosts, postMeta.FileNames)

  return paths.map(getFullPost)
}

export const importPostSlugs = (postMeta: PostMeta) =>
  postMeta.FileNames.map((FileName: string) => removeMdExt(FileName))

export const getNumberOfPages = (subject: string) => Math.ceil(getNumberOfPosts(subject, postMeta) / NUMBER_OF_POST_ON_PAGE)

const getNumberOfPosts = (subject: string, postMeta: PostMeta) => subject === "all" ? postMeta.amountOfPosts : postMeta.amountOfPostPerSubject[subject]

export const makePostParam = (slug: string) => ({
  params: { post: slug },
})
