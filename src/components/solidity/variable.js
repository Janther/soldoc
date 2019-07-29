import PropTypes from "prop-types"
import React from "react"

const Variable = ({ variable }) => (
  <>
    <span>{variable.type}</span>{" "}
    {variable.stateMutability && (
      <>
        <span>{variable.stateMutability}</span>{" "}
      </>
    )}
    {variable.visibility && (
      <>
        <span>{variable.visibility}</span>{" "}
      </>
    )}
    {variable.constantKeyword && (
      <>
        <span>{variable.constantKeyword}</span>{" "}
      </>
    )}
    {variable.storageLocation && (
      <>
        <span>{variable.storageLocation}</span>{" "}
      </>
    )}
    {variable.name && <span>{variable.name}</span>}
  </>
)

Variable.propTypes = {
  variable: PropTypes.object,
}

Variable.defaultProps = {
  variable: {},
}

export default Variable
