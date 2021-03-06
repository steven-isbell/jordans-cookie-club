import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import './index.css';
import favicon from '../assets/clementine.png';
import { Container } from '../styledComponents/layout';

import CartProvider from '../components/CartProvider';
import Header from '../components/Header';
import ErrorBoundary from '../components/ErrorBoundary';

const LayoutContainer = styled(Container)`
  padding-top: 14vh;
`;

const Layout = ({ children, data, location }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: "Jordan's Cookie of the Month Site" },
        {
          name: 'keywords',
          content: 'cookie, baking, cakes, joy, cookies, icing',
        },
      ]}
      link={[{ rel: 'shortcut icon', type: 'image/png', href: `${favicon}` }]}
    />
    <ErrorBoundary>
      <CartProvider>
        <Header siteTitle={data.site.siteMetadata.title} location={location} />
        <LayoutContainer>{children()}</LayoutContainer>
      </CartProvider>
    </ErrorBoundary>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
