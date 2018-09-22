require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Jordan's Cookie Club",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-stripe-checkout',
    'gatsby-plugin-styled-components',
  ],
};
