import PropTypes from "prop-types"
import React from "react"

import Param from "./param"
import Code from "../code"

const Event = ({ eventDefinition }) => (
  <>
    <h4 className="title is-4">
      {eventDefinition.name}(
      {eventDefinition.childrenVariableDeclaration.map((param, index) => (
        <>
          <Param param={param} />
          {index < eventDefinition.childrenVariableDeclaration.length - 1 &&
            ", "}
        </>
      ))}
      )
    </h4>
    <Code code={eventDefinition.source} />
    <hr className="hr" />
  </>
)

Event.propTypes = {
  eventDefinition: PropTypes.object,
}

Event.defaultProps = {
  eventDefinition: {},
}

export default Event
