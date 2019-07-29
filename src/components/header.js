import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{siteTitle}</h1>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
