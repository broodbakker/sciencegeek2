import * as R from "ramda";
//typescript
import { PostData, PostMeta, DataPhotos, Import, FullPost, SpecificPhotos, SpecificPhotos1, Num, Point, Point1 } from "../../typescript"
//helper
import { convertNumberToArray, getShuffle } from "./helperFunc"
import { NUMBER_OF_POST_ON_PAGE } from "../../public/variables"
//functions
import { modifyTags } from "./modifyTags"
//data
import data from "../../functions/postData.json"
const postMeta: PostMeta = JSON.parse(JSON.stringify(data));

export const importPost = async (path: string): Promise<PostData> => await import(`../content/posts/${path}`)

export const importPhoto = async (path: string): Promise<Import> =>
  await import(`../content/${"photo's"}/${path}.md`)

const importPhoto1 = async (obj: any): Promise<DataPhotos> => {
  const photo = await importPhoto(obj)
  return photo.attributes
}

export const importPhotos = async (paths: string[]) =>
  await Promise.all(paths.map(async (path) => importPhoto1(path)))

const getSubsetPosts = (files: string[], numberOfPosts: number,) => files.slice(0, numberOfPosts);

export const getPosts = async (amountOfPosts: number, sortSubject: string = "all"): Promise<PostData[]> => {
  console.log("test1")

  const postsSortedBySubject = sortSubject === "all" ? data.FileNames : postMeta.postPerSubject[sortSubject]




  const sortedSlugsByData = sortPostsByDate(postsSortedBySubject)

  const slugs = await getSubsetPosts(sortedSlugsByData, amountOfPosts)






  return JSON.parse(JSON.stringify(slugs));
}

const removeMdExt = (slug: string) => slug.substring(0, slug.length - 3)

const importPosts = async (postNames: string[]): Promise<FullPost[]> =>
  await Promise.all(postNames.map(getFullPost))


const modifyPost = (post: PostData, photos: SpecificPhotos1, slug: string, tag: any[]): FullPost => ({
  title: post.attributes.title,
  subtitle: post.attributes.Subtitle || "",
  date: post.attributes.date,
  onderwerp: post.attributes.onderwerp,
  auteur: post.attributes.auteur,
  tags: modifyTags(tag),
  html: post.html,
  photos,
  slug
})

export const getFullPost = async (slug: string) => {
  const post = await importPost(slug)

  const headerData = postMeta.postMeta[slug].headerPhoto
  const photosData = postMeta.postMeta[slug].photos


  const tag = post.attributes.tags ? post.attributes.tags : []

  const photos: any = await getSpecificPhoto({ headerData, photosData })

  const p1: any = photos.photosData ? photos : {
    headerData: photos.headerData, photosData: []
  }

  return modifyPost(post, p1, removeMdExt(slug), tag)
}

const test = async (photosData: any) => photosData ? photosData.length !== 0 && importPhotos(photosData) : []

export const getSpecificPhoto = async ({ headerData, photosData }: SpecificPhotos) =>
  ({ headerData: await importPhoto1(headerData), photosData: await test(photosData) })

const getNumberOfPages1 = (subjectName: string) => convertNumberToArray(getNumberOfPages(subjectName))

const getSubjectPath = (subjectName: string) => getNumberOfPages1(subjectName).map((arr: number) => ({
  params: {
    subject: subjectName,
    id: (arr + 1).toString(),
  }
}))

export const getSubjectPaths = ({ subjectNames }: PostMeta) =>
  [...subjectNames.map(getSubjectPath), getSubjectPath("all")].flat()

export const getPropsFromPaths = async (slugName: string, slugId: string) => {
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

const getRandomPaths = (amountOfPosts: number, totalPosts: number, postsBySubject: string[]) =>
  getPaths(getRandomNumbers(totalPosts, amountOfPosts), postsBySubject)

const getPaths = (PostNumbers: number[], AllPostPaths: string[]) =>
  PostNumbers.map((postNumber) => AllPostPaths[postNumber])

export const getRandomPostBySubject = async (amountOfPosts: number, subject: string, postMeta: PostMeta) => {
  const paths = getRandomPaths(amountOfPosts, postMeta.postPerSubject[subject].length, postMeta.postPerSubject[subject])

  return await importPosts(paths)
}

export const getRandomPosts = async (numberOfPost: number = 1): Promise<FullPost[]> => {
  const paths = getRandomPaths(numberOfPost, postMeta.amountOfPosts, postMeta.FileNames)

  return await importPosts(paths)
}

export const importPostSlugs = (postMeta: PostMeta) =>
  postMeta.FileNames.map((FileName: string) => removeMdExt(FileName))

export const getNumberOfPages = (subject: string) => Math.ceil(getNumberOfPosts(subject, postMeta) / NUMBER_OF_POST_ON_PAGE)

const getNumberOfPosts = (subject: string, postMeta: PostMeta) => subject === "all" ? postMeta.amountOfPosts : postMeta.amountOfPostPerSubject[subject]