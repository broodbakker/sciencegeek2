import React from 'react'
//components
import { Layout } from "../components/layout"
import { SeoHeader } from '../components/seoHeader';

export default function About() {
  return <Layout >
    <SeoHeader subtitle="Over ScienceGeek" />
    <main>
      <div className="p-4 text-black mb-20 mt-8">

        <h1 className="text-3xl mb-8 font-bold">Over ScienceGeek</h1>

        <p className="text-xl mb-4">ScienceGeek is dé nieuwssite voor iedereen die van wetenschappelijke feitjes en weetjes
          houdt, iedere dag weer.</p>

        <p className="text-xl mb-4">Iedere dag wil ScienceGeek de wereld beter begrijpen en je de beste, leukste en
          interessantste wetenschappelijke nieuwsfeiten brengen. Bij ScienceGeek vinden we
          wetenschap zo belangrijk dat we doelbewust gekozen hebben voor een gratis site, zonder
          abonnementen of dure hard copy glossy uitgave. Kennis moet vrij toegankelijk zijn voor
          iedereen.</p>

        <p className="text-xl mb-6">We zijn een 100% onafhankelijk mediabedrijf en niet gerelateerd aan enige filosofische,
          religieuze of politieke stroming. We baseren onze artikelen op wetenschappelijke
          bevindingen van gerenommeerde universiteiten en andere onderzoeksinstanties. Zo blijft
          ons nieuws verifieerbaar en betrouwbaar.</p>

        <h3 className="text-xl mb-4 font-bold">Contact met ScienceGeek</h3>

        <p className="text-xl mb-4">Heb je ook wetenschappelijk nieuws dat je graag wilt delen of ben je net gepromoveerd?
          Dan horen we heel graag van je. Stuur een persbericht naar redactie@sciencegeek.nl met je contactgegevens en beeldmateriaal. Dan nemen we binnen 24 uur contact met je op.</p>

        <p className="text-xl mb-4">We wensen je een interessante en leuke dag toe!</p>
        <br />

        <p className="text-xl italic">Monique de Leeuw</p>

        <p className="text-xl mb-4">Hoofdredacteur ScienceGeek</p>
        <br />

        <p className="text-lg">ScienceGeek is een uitgave van ICS Media, gevestigd te Duiven, Van Goghstraat 4, 6921 NJ</p>
      </div>
    </main>
  </Layout>
}