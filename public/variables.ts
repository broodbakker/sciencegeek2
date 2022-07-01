export const NAV_NAMES = ["Home", "History", "Nature", "Human", "Quirky", "Space", "Tech"]
export const NAV_LINKS = ["/", "/history", "/nature", "/human", "/quirky", "/space", "/tech"]
export const POSTS_PATH = "./content/posts";
export const PHOTOS_PATH = "./content/photos";
export const NUMBER_OF_POST_ON_PAGE = 6
export const AMOUNT_OF_POST_FRONTPAGE = 10
export const AMOUNT_OF_RANDOM_POST_FRONTPAGE = 6
export const TIME_TILL_HIDDEN_BG = 3


export const LAATSTE_NIEUWS: { [key: string]: any } = {
  title: "Het laatste nieuws op ScienceGeek!",
  link: "/net-binnen/all/1",
  linkText: "Meer net binnen",
  history: {
    title: "Het laatste history nieuws!",
    link: "/net-binnen/history/1",
    linkText: "Meer history nieuws"
  },
  nature: {
    title: "Het laatste nature nieuws!",
    link: "/net-binnen/nature/1",
    linkText: "Meer nature nieuws"
  },
  human: {
    title: "Het laatste human nieuws!",
    link: "/net-binnen/human/1",
    linkText: "Meer human nieuws"
  },
  quirky: {
    title: "Het laatste quirky nieuws!",
    link: "/net-binnen/quirky/1",
    linkText: "Meer quirky nieuws"
  },
  space: {
    title: "Het laatste space nieuws!",
    link: "/net-binnen/space/1",
    linkText: "Meer space nieuws"
  },
  tech: {
    title: "Het laatste tech nieuws!",
    link: "/net-binnen/tech/1",
    linkText: "Meer tech nieuws"
  }
}

export const RANDOM_BIG_POSTS = {
  title: "Lees ook één van onze andere verhalen"
}

export const PAGE404 = () => ({
  title: "Helaas, er ging iets mis! De pagina kon niet gevonden worden",
  subtitle: "Mogelijk bestaat de pagina niet meer of is die onder constructie",
  textLink: " ga terug naar onze voorpagina"
})

export const NET_BINNEN = () => ({
  title: "Net binnen"
})