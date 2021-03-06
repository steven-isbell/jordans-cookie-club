require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Clementine Cookie Co.",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-stripe-checkout',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
  ],
};
