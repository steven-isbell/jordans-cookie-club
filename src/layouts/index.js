import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import './index.css';
import { Container } from '../styledComponents/layout';

import Header from '../components/Header';

const LayoutContainer = styled(Container)`
  padding-top: 0;
`;

const Layout = ({ children, data }) => (
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
    />
    <Header siteTitle={data.site.siteMetadata.title} />
    <LayoutContainer>{children()}</LayoutContainer>
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
