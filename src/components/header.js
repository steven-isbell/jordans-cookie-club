import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HeaderContainer = styled.header`
  ${props => props.background};
  margin-bottom: 1.45rem;
`

const HeaderWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Heading = styled.h1`
  margin: 0;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const BACKGROUND = 'background-color: #20232a'

const Header = ({ background, title }) => (
  <HeaderContainer background={background}>
    <HeaderWrapper>
      <Heading>
        <StyledLink to="/">{title}</StyledLink>
      </Heading>
    </HeaderWrapper>
  </HeaderContainer>
)

Header.defaultProps = {
  background: BACKGROUND,
  title: "Jordan's Cookie Club",
}

Header.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
}

export default Header
