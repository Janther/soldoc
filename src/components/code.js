import PropTypes from "prop-types"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

const Code = ({ code }) => {
  const [showSource, setShowSource] = useState(false)
  return (
    <>
      <button
        className="button is-small is-info"
        onClick={() => {
          setShowSource(!showSource)
        }}
      >
        <FontAwesomeIcon icon={faCode} /> {showSource ? "Hide" : "Show"} source
      </button>
      <div className="highlight">
        <pre className={showSource ? "" : "is-hidden"}>
          <code className="language-solidity" data-lang="solidity">
            {code}
          </code>
        </pre>
      </div>
    </>
  )
}

Code.propTypes = {
  code: PropTypes.string,
}

Code.defaultProps = {
  code: ``,
}

export default Code
