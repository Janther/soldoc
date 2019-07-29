import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import TreeFolder from "./TreeFolder"
import "./menu.css"

const Tree = () => {
  const data = useStaticQuery(graphql`
    query ContractList {
      allSource {
        edges {
          node {
            id
            relativePath
            childrenContract {
              id
              name
            }
          }
        }
      }
    }
  `)

  const makeTree = (tree, branch) => {
    if (branch.length === 2) {
      tree[branch[0]] = branch[1]
    } else {
      tree[branch[0]] = makeTree(
        tree[branch[0]] ? tree[branch[0]] : {},
        branch.splice(1)
      )
    }
    return tree
  }

  return (
    <aside className="menu">
      <p className="menu-label">Contracts</p>
      <ul className="menu-list">
        <TreeFolder
          name="/"
          tree={data.allSource.edges
            .map(({ node }) => {
              let files = node.relativePath.split("/")
              files.push(node.childrenContract)
              return files
            })
            .reduce(makeTree, {})}
        />
      </ul>
    </aside>
  )
}

export default Tree
