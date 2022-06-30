export const getLengthOfArray = (array: any[]) => array.length

export const convertNumberToArray = (num: number) => Array.from(Array(num).keys())

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const getFirstElement = (arr: any[]) => arr[0]
export const removeFirstEement = (arr: any[]) => arr.slice(1)


//enter array --> shuffle.next().value
function* getShuffle(array: number[]): Generator<number> {
  var i = array.length;

  while (i--) {
    yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}

export { getShuffle }

const splitAt = (index: any) => (x: string) => [x.slice(0, index), x.slice(index)]

const test2func = (arr: any, atAlinea: number) => {
  let num = -1
  if (arr.length === 0) return -1

  for (const [i, ele] of arr.entries()) {
    if (atAlinea > i) {
      continue
    }
    if (ele) {
      num = -1
      continue
    }
    if (ele === false && num !== -1) {
      num = i
      break
    }
    if (ele === false) {
      num = i
      continue
    }
  }
  return num
}

const splitAtP = (html: string) => html.split(/(?=\<p>)/)

const inclStrong = (str: string) =>
  str.includes("<strong>")

const splitAtLetter = (html: any, atAlinea: number) => {

  const includesStrong = splitAtP(html).map(inclStrong)

  const splitAt = test2func(includesStrong, atAlinea)

  const testBonus1 = splitAtP(html).slice(0, splitAt).map((test: string) => test.length)

  return testBonus1.reduce((a: any, b: any) => a + b, 0)
}

const getSplitPosts = (atLetter: number, html: string) =>
  ({ firstPart: splitAt(atLetter)(html)[0], secondPart: splitAt(atLetter)(html)[1] })

export const splitHtml = (atAlinea: number, html: string) =>
  getSplitPosts(splitAtLetter(html, atAlinea), html)

export const imageResize = (image: any) => `${image}`

export const makeMdFileExt = (slug: string) => `${slug}.md`
