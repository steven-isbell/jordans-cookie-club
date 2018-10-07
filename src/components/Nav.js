import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlexedContainer } from '../styledComponents/layout';

const NavContainer = styled.nav`
  width: 20%;
  height: 100%;
`;

const NavWrapper = styled(FlexedContainer)`
  width: 100%;
  justify-content: space-evenly;
`;

const Nav = ({ cart, StyledLink }) => (
  <NavContainer>
    <NavWrapper>
      {/*<StyledLink to="/sign_up">Sign Up</StyledLink>
<StyledLink to="/sign_in">Sign In</StyledLink>*/}
      <StyledLink to="/cart">Cart {cart}</StyledLink>
    </NavWrapper>
  </NavContainer>
);

Nav.defaultProps = {
  cart: 0,
  StyledLink: null,
};

Nav.propTypes = {
  cart: PropTypes.number,
  StyledLink: PropTypes.func,
};

export default Nav;
