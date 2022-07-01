import { useState } from 'react'
import { useLunr } from 'react-lunr'
import lunr from "lunr";
//data
//function
import { createStore } from "../localFunctions/lunrjs"
import data from "../../content/searchData.json"
import data1 from "../../functions/data.json"


const index = lunr(function () {
  this.field('title', {
    boost: 10
  })
  this.field('onderwerp', {
    boost: 10
  })
  this.field("content");
  data.forEach(({ title, subtitle, onderwerp, html }) => {
    this.add({
      html,
      title,
      id: title,
      onderwerp,
    })
  })
});


export const useSearch = () => {
  const [query, setQuery] = useState("")
  const results = useLunr(query, index, createStore(data1))

  return { setQuery, results, query }
}