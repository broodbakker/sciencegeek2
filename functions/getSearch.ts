const lunr = require('lunr');
const posts = require('./data.json');


const numberOfResults = 5

const handler = async (event: any) => {
  try {
    const inputUser: string = event.queryStringParameters.search;
    if (!inputUser) throw ('Missing term query parameter');




    const postsIndexedForSearch = lunr.Index.load(require('./index.json'));

    const formattedSearch = formatSearch(postsIndexedForSearch, inputUser, numberOfResults)

    const test = postsIndexedForSearch.search(inputUser)




    test.forEach((r: any) => {
      r.title = posts[r.ref].title;
      r.image = posts[r.ref].image;
      r.slug = posts[r.ref].slug;
      r.onderwerp = posts[r.ref].onderwerp;
      r.date = posts[r.ref].date;
    });



    return {
      statusCode: 200,
      body: JSON.stringify(test),

    }
  } catch (error: any) {
    return { statusCode: 500, body: error.toString() }
  }
}
export { handler };

export const formatSearch = (data: any, searchInputUser: string, amountofResults: number): string[] => {

  if (searchInputUser === "") return []

  const results = data.search(searchInputUser)

  const refs = results.map((result: any) => { return result.ref })
  const titles = refs.splice(0, amountofResults)

  return titles
}