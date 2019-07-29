import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import TreeSource from "./TreeSource"

const TreeFolder = ({ name, tree }) => {
  const [folderOpen, setFolderOpen] = useState(name === "/")
  return (
    <li>
      <button
        onClick={() => {
          setFolderOpen(!folderOpen)
        }}
        className="button is-white is-fullwidth has-text-grey-dark has-text-left"
      >
        <FontAwesomeIcon icon={folderOpen ? faFolderOpen : faFolder} /> {name}
      </button>
      <ul
        style={{ marginTop: 0, marginBottom: 0 }}
        className={folderOpen ? "" : "is-hidden"}
      >
        {Object.keys(tree)
          .filter(key => !Array.isArray(tree[key]))
          .sort()
          .map((key, index) => (
            <TreeFolder key={`folder ${index}`} name={key} tree={tree[key]} />
          ))}
        {Object.keys(tree)
          .filter(key => Array.isArray(tree[key]))
          .sort()
          .map((key, index) => (
            <TreeSource
              key={`source ${index}`}
              name={key}
              contracts={tree[key]}
            />
          ))}
      </ul>
    </li>
  )
}

export default TreeFolder
