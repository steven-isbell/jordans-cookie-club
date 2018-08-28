import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Container } from '../styledComponents/layout';

const HeaderContainer = styled.header`
  ${props => props.background};
  margin-bottom: 1.45rem;
`;

const Heading = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const BACKGROUND = 'background-color: #20232a';

const Header = ({ background, title }) => (
  <HeaderContainer background={background}>
    <Container>
      <Heading>
        <StyledLink to="/">{title}</StyledLink>
      </Heading>
    </Container>
  </HeaderContainer>
);

Header.defaultProps = {
  background: BACKGROUND,
  title: "Jordan's Cookie Club",
};

Header.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
