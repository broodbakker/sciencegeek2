const fs = require('fs');
const blogPostsFolder = './content';
const withPWA = require('next-pwa')


module.exports = withPWA({
  future: {
    webpack5: true,
  },


  pwa: { dest: 'public' },
  webpack: configuration => {
    configuration.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
    });
    return configuration;
  }, async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      // ...getPathsForPosts(),
    };
  },
})



// const getPathsForPosts = () => {
//   return fs
//     .readdirSync(blogPostsFolder)
//     .map(blogName => {
//       const trimmedName = blogName.substring(0, blogName.length - 3);
//       return {
//         [`/blog/${trimmedName}`]: {
//           page: '/blog/[slug]',
//           query: {
//             slug: trimmedName,
//           },
//         },
//       };
//     })
//     .reduce((acc, curr) => {
//       return { ...acc, ...curr };
//     }, {});
// };



