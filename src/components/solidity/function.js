import PropTypes from "prop-types"
import React from "react"

import Param from "./param"
import Code from "../code"

const Function = ({ functionDefinition }) => (
  <>
    <h4 className="title is-4">
      {functionDefinition.isConstructor && !functionDefinition.name
        ? "constructor"
        : functionDefinition.name
        ? `function ${functionDefinition.name}`
        : "function"}
      (
      {functionDefinition.childrenParameter.map((param, index) => (
        <span key={param.id}>
          <Param param={param} />
          {index < functionDefinition.childrenParameter.length - 1 && ", "}
        </span>
      ))}
      )
    </h4>
    <div className="field is-grouped is-grouped-multiline">
      <div className="control">
        <span className="tag is-primary">{functionDefinition.visibility}</span>
      </div>
      {functionDefinition.stateMutability && (
        <div className="control">
          <span className="tag is-info">
            {functionDefinition.stateMutability}
          </span>
        </div>
      )}
      {functionDefinition.childrenModifierInvocation.map(modifier => (
        <div className="control">
          <span className="tag is-link">{modifier.name}</span>
        </div>
      ))}
    </div>
    {functionDefinition.childReturns && (
      <>
        <h5 className="title is-5">Returns</h5>
        <ul>
          {functionDefinition.childReturns.childrenParameter.map(param => (
            <li key={param.id}>
              <Param param={param} />
            </li>
          ))}
        </ul>
      </>
    )}
    <Code code={functionDefinition.source} />
    <hr className="hr" />
  </>
)

Function.propTypes = {
  functionDefinition: PropTypes.object,
}

Function.defaultProps = {
  functionDefinition: {},
}

export default Function
