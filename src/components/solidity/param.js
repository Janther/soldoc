import PropTypes from "prop-types"
import React from "react"

const Param = ({ param }) => (
  <>
    <span>{param.type}</span>{" "}
    {param.storageLocation && (
      <>
        <span>{param.storageLocation}</span>{" "}
      </>
    )}
    {param.stateMutability && (
      <>
        <span>{param.stateMutability}</span>{" "}
      </>
    )}
    {param.name && <span>{param.name}</span>}
  </>
)

Param.propTypes = {
  param: PropTypes.object,
}

Param.defaultProps = {
  param: {},
}

export default Param
