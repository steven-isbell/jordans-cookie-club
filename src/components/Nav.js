import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// const StyledNav = styled.nav`
//   display: flex;
//   align-items: ;
// `;

const Nav = ({ cart }) => (
  <nav>
    <div>Sign Up</div>
    <div>Sign In</div>
    <div>Cart {cart}</div>
  </nav>
);

Nav.defaultProps = {
  cart: 0,
};

Nav.propTypes = {
  cart: PropTypes.number,
};

export default Nav;
