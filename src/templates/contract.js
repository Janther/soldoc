import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import Event from "../components/solidity/event"
import Modifier from "../components/solidity/modifier"
import Function from "../components/solidity/function"

const Contract = ({ data }) => (
  <>
    <SEO title={data.contract.name} />
    <h2 className="title is-2">{data.contract.name}</h2>
    {data.contract.childrenBaseContract.length > 0 && (
      <h4 className="subtitle is-5">
        {data.contract.childrenBaseContract.map((baseContract, index) => (
          <>
            <Link
              to={`/${
                data.allSource.nodes
                  .filter(source =>
                    data.contract.parent.childrenImportDirective
                      .map(importDirective => importDirective.relativePath)
                      .includes(source.relativePath)
                  )
                  .reduce(
                    (contracts, source) =>
                      contracts.concat(source.childrenContract),
                    []
                  )
                  .filter(contract => contract.name === baseContract.name)[0].id
              }`}
            >
              {baseContract.name}
            </Link>
            {index < data.contract.childrenBaseContract.length - 1 && ", "}
          </>
        ))}
      </h4>
    )}
    {/*<Link to={`/${data.contract.id}`}>{data.contract.parent.relativePath}</Link>*/}
    {data.contract.childrenEventDefinition.length > 0 && (
      <div className="section">
        <h3 className="title is-3">Events</h3>
        {data.contract.childrenEventDefinition.map(eventDefinition => (
          <Event key={eventDefinition.id} eventDefinition={eventDefinition} />
        ))}
      </div>
    )}
    {data.contract.childrenModifierDefinition.length > 0 && (
      <div className="section">
        <h3 className="title is-3">Modifiers</h3>
        {data.contract.childrenModifierDefinition.map(modifier => (
          <Modifier key={modifier.id} modifier={modifier} />
        ))}
      </div>
    )}
    {data.contract.childrenFunctionDefinition.length > 0 && (
      <div className="section">
        <h3 className="title is-3">Functions</h3>
        {data.contract.childrenFunctionDefinition.map(functionDefinition => (
          <Function
            key={functionDefinition.id}
            functionDefinition={functionDefinition}
          />
        ))}
      </div>
    )}
  </>
)

export const query = graphql`
  query($id: String!, $relativePaths: [String]!) {
    allSource(filter: { relativePath: { in: $relativePaths } }) {
      nodes {
        id
        relativePath
        childrenContract {
          id
          name
        }
      }
    }
    contract(id: { eq: $id }) {
      id
      name
      childrenBaseContract {
        name
      }
      childrenModifierDefinition {
        id
        name
        source
        childrenParameter {
          id
          type
          stateMutability
          storageLocation
          name
        }
      }
      childrenEventDefinition {
        id
        name
        source
        childrenVariableDeclaration {
          id
          type
          constantKeyword
          isIndexed
          name
        }
      }
      childrenFunctionDefinition {
        id
        isConstructor
        name
        source
        stateMutability
        visibility
        childrenParameter {
          id
          type
          storageLocation
          stateMutability
          name
        }
        childrenModifierInvocation {
          childrenModifierArgument {
            id
            name
          }
          id
          name
        }
        childReturns {
          childrenParameter {
            id
            type
            storageLocation
            stateMutability
            name
          }
        }
      }
      parent {
        ... on Source {
          id
          relativePath
          childrenImportDirective {
            id
            path
            relativePath
          }
        }
      }
    }
  }
`

export default Contract
