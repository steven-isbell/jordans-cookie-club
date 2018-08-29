import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Heading1 } from '../styledComponents/typography';

import Nav from './Nav';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.45rem;
  font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
  background: #fff;
  font-weight: 400;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  min-height: 2.85714286em;
  padding: 10px 20% 10px 10%;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const Header = ({ background, title }) => (
  <HeaderContainer background={background}>
    <Heading1>
      <StyledLink to="/">{title}</StyledLink>
    </Heading1>
    <Nav StyledLink={StyledLink} />
  </HeaderContainer>
);

Header.defaultProps = {
  title: "Jordan's Cookie Club",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
