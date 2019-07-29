import PropTypes from "prop-types"
import React from "react"

import Param from "./param"
import Code from "../code"

const Modifier = ({ modifier }) => (
  <>
    <h4 className="title is-4">
      {modifier.name}
      {modifier.childrenParameter.length > 0 && (
        <>
          (
          {modifier.childrenParameter.map((param, index) => (
            <span key={param.id}>
              <Param param={param} />
              {index < modifier.childrenParameter.length - 1 && ", "}
            </span>
          ))}
          )
        </>
      )}
    </h4>
    <Code code={modifier.source} />
    <hr className="hr" />
  </>
)

Modifier.propTypes = {
  modifier: PropTypes.object,
}

Modifier.defaultProps = {
  modifier: {},
}

export default Modifier
