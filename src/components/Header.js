import React, { Component } from 'react';
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
  font-family: 'Clicker Script', cursive;
  background: #fff;
  font-weight: 400;
  border: 1px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  min-height: 2.85714286em;
  padding: 10px 20% 10px 10%;
  position: fixed;
  width: 100vw;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

class Header extends Component {
  render() {
    return (
      <HeaderContainer background={this.props.background}>
        <Heading1>
          <StyledLink to="/">
            <span style={{ fontFamily: 'Clicker Script, cursive' }}>
              {this.props.title}
            </span>
          </StyledLink>
        </Heading1>
        <Nav StyledLink={StyledLink} location={this.props.location} />
      </HeaderContainer>
    );
  }
}

Header.defaultProps = {
  title: 'Clementine Cookie Co.',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
