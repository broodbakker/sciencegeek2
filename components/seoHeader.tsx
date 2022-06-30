import React, { FunctionComponent } from 'react'
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

type seoHeader = {
  subtitle?: string
}
export const SeoHeader: FunctionComponent<seoHeader> = ({ subtitle }) => {
  const title = `${subtitle} | ScienceGeek.nl`;
  const desc =
    "ScienceGeek.nl is een onafhankelijk medium met wetenschapsnieuws. Vol onderzoek over tech, robots, seks, space, natuur en psychologie nieuws | ScienceGeek.nl";
  const ogImgRelativePath = "/sciencegeeklogo.png";

  const siteURL = "https://sciencegeek.nl";
  const ogImageURL = `${siteURL}${ogImgRelativePath}`;
  const pathName = useRouter().pathname;
  const pageURL = pathName === "/" ? siteURL : siteURL + pathName;
  const twitterHandle = "";
  const siteName = "sciencegeek.nl";

  return (
    <NextSeo
      title={title}
      description={desc}
      canonical={pageURL}
      openGraph={{
        type: "website",
        locale: "nl_NL", //  Default is en_US
        url: pageURL,
        title,
        description: desc,
        images: [
          {
            url: ogImageURL,
            width: 1200,
            height: 630,
            alt: "ScienceGeek.nl - ScienceGeek.nl is een onafhankelijk medium met wetenschapsnieuws.",
          },
        ],
        site_name: siteName,
      }}
      // twitter={{
      //   handle: twitterHandle,
      //   site: twitterHandle,
      //   cardType: "summary_large_image",
      // }}
      additionalMetaTags={[
        {
          property: "author",
          content: title,
        },
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: `${siteURL}/ico/sciencegeeklogo.ico`,
        },
        // {
        //   rel: "manifest",
        //   href: "/site.manifest",
        // },
      ]}
    />
  );
}