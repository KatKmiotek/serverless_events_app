module.exports = {
    plugins: [
      // `gatsby-plugin-netlify`
        {
          resolve: `gatsby-plugin-create-client-paths`,
          options: { prefixes: [`/app/*`] }
        }
      ]
}