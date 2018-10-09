import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FlexedContainer } from '../styledComponents/layout';
import { Consumer } from '../context/CartContext';

const NavContainer = styled.nav`
  width: 20%;
  height: 100%;
`;

const NavWrapper = styled(FlexedContainer)`
  width: 100%;
  justify-content: space-evenly;
`;

const Nav = ({ StyledLink, location }) => (
  <NavContainer>
    <Consumer>
      {({ cart }) => (
        <NavWrapper>
          {/*<StyledLink to="/sign_up">Sign Up</StyledLink>
<StyledLink to="/sign_in">Sign In</StyledLink>*/}
          {location.pathname !== '/cart' ? (
            <StyledLink to="/cart">Cart {cart.length}</StyledLink>
          ) : (
            <StyledLink to="/">Home</StyledLink>
          )}
        </NavWrapper>
      )}
    </Consumer>
  </NavContainer>
);

Nav.defaultProps = {
  StyledLink: null,
};

Nav.propTypes = {
  StyledLink: PropTypes.func,
};

export default Nav;
