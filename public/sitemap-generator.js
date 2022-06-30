module.exports = {
  siteUrl: "https://sciencegeek.nl",
  generateRobotsTxt: true,
  exclude: ["/en*", "/de*", "/disallowed"],
  alternateRefs: [
    {
      href: "https://sciencegeek.nl/en",
      hreflang: "en",
    },
    {
      href: "https://sciencegeek.nl/de",
      hreflang: "de",
    },
    {
      href: "https://sciencegeek.nl/nl",
      hreflang: "nl",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/disallowed",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};