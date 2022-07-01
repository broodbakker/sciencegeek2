const fs = require('fs')
const { join } = require('path')
const matter = require('gray-matter')

const MT = require("mark-twain")

const lunr = require("lunr")

const { subjects } = require("./variables")

const POSTS_PATH = "./content/posts";
const PHOTOS_PATH = "./content/photos";

const getFiles = (path) => importSlugs(path).map((slug) => getFullPost(addMdExt(slug)))

const importSlugs = (filePath) =>
  fs.readdirSync(filePath)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))


const addMdExt = (s) => `${s}.md`
const removeMdExt = (slug) => slug.substring(0, slug.length - 3)

const getFullPost = (slug) => {
  const post = getFileBySlug(slug, POSTS_PATH)

  const tag = post.data.tags ? post.data.tags : []

  return modifyPost(post, tag)
}

const getFileBySlug = (
  slug,
  Path
) => {
  const filePath = join(Path, `${slug}`);

  const fileContents = fs.readFileSync(filePath);

  return matter(fileContents);

};

const modifyPost = (post, tag) => ({
  title: post.data.title,
  subtitle: post.data.Subtitle || "",
  onderwerp: post.data.onderwerp,
  auteur: post.data.auteur,
  tags: modifyTags(tag),
  html: post.content,
})

const modifyTags = (tags) => {
  return tags.length === 0 ? [] : t(tags)
}

const t = (tags) => {

  return (tags[0].search(",") !== -1 && tags.length === 1) ? tags[0].split(",") : tags
}



module.exports = {
  onSuccess: () => {
    console.log('onInit: I run before anything else 🐣');
  },
  onPreBuild: async ({ utils }) => {
    console.log("my plugin loaded!")

    const PostFileNames = getPostFileNames()

    const postTitles = await getPosts(PostFileNames)

    const index = createIndex(postTitles)
    const postData = await createPostData(subjects)

    fs.writeFileSync('./functions/data.json', JSON.stringify(postTitles));
    fs.writeFileSync('./functions/index.json', JSON.stringify(index));
    fs.writeFileSync('./functions/postData.json', JSON.stringify(postData));

    const post = getFiles(POSTS_PATH)

    fs.writeFileSync('./content/searchData.json', JSON.stringify(post));

    try {
    } catch (error) {
      utils.build.failBuild('Failure message', { error })
    }
  },
}

const createPostData = async (subjectNames) => {
  const PostFileNames = getPostFileNames()
  const amountOfPosts = PostFileNames.length
  const data = await getData(PostFileNames)
  const test = changeData(data)

  const amountOfPostPerSubject = test.arr.amountOfPostPerSubject
  const postPerSubject = test.arr.postPerSubject
  const postMeta = test.arr.postMeta

  return {
    FileNames: PostFileNames, amountOfPosts,
    amountOfPostPerSubject,
    postPerSubject, postMeta, subjectNames
  }
}

const changeData = (posts) => {
  let arr = { amountOfPostPerSubject: {}, postPerSubject: {}, postMeta: {} }

  posts.map((post) => {
    const onderwerp = post.onderwerp
    const slug = post.slug
    const headerPhoto = post.headerPhoto
    const photos = post.photos
    const date = post.date

    const amountOfPostPerSubject = getAmountOfPostPerSubject(arr.amountOfPostPerSubject, onderwerp)
    const postPerSubject = getPostPerSubject(arr.postPerSubject, onderwerp, slug)
    const postMeta = setPostPhotos(arr.postMeta, slug, headerPhoto, photos, date,)

    arr.amountOfPostPerSubject = amountOfPostPerSubject
    arr.postPerSubject = postPerSubject
    arr.postMeta = postMeta

  })

  return { arr }
}

const setPostPhotos = (arr, slug, headerPhoto, photos, date) => {
  const arr1 = arr
  arr1[slug] = { headerPhoto, photos, date, name: slug }

  return arr1
}

const getPostPerSubject = (arr, onderwerp, slug) => {
  const arr1 = arr

  if (Object.prototype.hasOwnProperty.call(arr, onderwerp)) {
    const onderwerpList = arr1[onderwerp]
    onderwerpList.push(slug)
    arr1[onderwerp] = onderwerpList
  }
  else {
    arr1[onderwerp] = [slug]
  }
  return arr1
}

const getAmountOfPostPerSubject = (arr, onderwerp) => {
  const arr1 = arr
  if (Object.prototype.hasOwnProperty.call(arr, onderwerp)) {
    arr1[onderwerp] = arr[onderwerp] + 1
  }
  else {
    arr1[onderwerp] = 1
  }
  return arr1

}

const getData = (fileNames) => {
  return Promise.all(
    fileNames.map(async (path, index) => {
      const markdown = MT(fs.readFileSync(`./content/posts/${path}`).toString());

      const slug = path
      const onderwerp = markdown.meta.onderwerp
      const headerPhoto = markdown.meta.headerPhoto
      const photos = markdown.meta["photos"]
      const date = markdown.meta.date

      return { slug, onderwerp, headerPhoto, photos, date }
    })
  )
}

const getPostFileNames = () => {
  const PostFileNames = fs.readdirSync("./content/posts").map((file) => {
    return file
  })
  return PostFileNames
}

const getPosts = async (fileNames) => {
  return Promise.all(
    fileNames.map(async (path, index) => {
      const markdown = MT(fs.readFileSync(`./content/posts/${path}`).toString());
      const title = markdown.meta.title
      const onderwerp = markdown.meta.onderwerp
      const date = markdown.meta.date


      const tags = markdown.meta.tags ? markdown.meta.tags.join(" ") : ""

      const content = markdown.content.flat().join(' ')
      const slug = path.substring(0, path.length - 3)
      const id = index
      const headerPhoto = markdown.meta.headerPhoto
      const link = MT(fs.readFileSync(`./content/${"photos"}/${headerPhoto}.md`).toString());

      const image = link.meta.image
      return { title, tags, content, slug, id, image, date, onderwerp }
    })
  )
}


const createIndex = (posts) => {
  var idx = lunr(function () {
    const lunrProp = lunr
    this.field('tags', {
      boost: 10
    })
    this.field("title", {
      boost: 10
    });
    this.field("content");
    this.ref('id')

    const datas = posts

    datas.map((data, index) => {
      this.add(data)
    })
  })

  return idx
}
