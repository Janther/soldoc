import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFileContract } from "@fortawesome/free-solid-svg-icons"

const TreeSource = ({ name, contracts }) => (
  <li>
    {contracts.filter(contract => contract.name + ".sol" === name).length ? (
      <Link
        to={`/${
          contracts.filter(contract => contract.name + ".sol" === name)[0].id
        }`}
        activeClassName="is-active"
      >
        <FontAwesomeIcon icon={faFileContract} /> {name}
      </Link>
    ) : (
      <button className="button is-white is-fullwidth has-text-grey-dark has-text-left">
        <FontAwesomeIcon icon={faFile} /> {name}
      </button>
    )}
    {(contracts.length > 1 || contracts[0].name + ".sol" !== name) && (
      <ul style={{ marginTop: 0, marginBottom: 0 }}>
        {contracts
          .filter(contract => contract.name + ".sol" !== name)
          .map(contract => (
            <li key={contract.id}>
              <Link to={`/${contract.id}`} activeClassName="is-active">
                <FontAwesomeIcon icon={faFileContract} /> {contract.name}
              </Link>
            </li>
          ))}
      </ul>
    )}
  </li>
)

export default TreeSource
