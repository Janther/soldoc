/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "bulma"
import Header from "./header"
import Tree from "./Tree"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="section">
        <div className="columns">
          <Tree />
          <div className="column">{children}</div>
        </div>
      </main>
      <footer className="section footer">
        <div className="content has-text-centered">
          <p>
            © {new Date().getFullYear()}, Built with{" "}
            <strong>SolidityDoc</strong> by Klaus Hott. The source code is
            licensed{" "}
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
          </p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
