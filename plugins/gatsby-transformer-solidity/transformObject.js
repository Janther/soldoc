"use strict"

const transformObject = ({
  createContentDigest,
  createNode,
  createParentChildLink,
}) => (obj, id, type, parent) => {
  const solidityNode = Object.assign({}, obj, {
    id,
    parent: parent.id,
    internal: {
      contentDigest: createContentDigest(obj),
      type,
    },
  })
  createNode(solidityNode)
  createParentChildLink({
    parent: parent,
    child: solidityNode,
  })

  return solidityNode
}

module.exports = transformObject
