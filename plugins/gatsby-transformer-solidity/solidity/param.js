"use strict"

const configPrepareTransformParam = ({
  transformObject,
  createNodeId,
}) => parent => param =>
  transformObject(
    {
      type:
        param.typeName.type === "ArrayTypeName"
          ? `${param.typeName.baseTypeName.name}[${
              param.typeName.length ? param.typeName.length : ""
            }]`
          : param.typeName.type === "UserDefinedTypeName"
          ? param.typeName.namePath
          : param.typeName.name,
      name: param.name,
      storageLocation: param.storageLocation,
      stateMutability: param.typeName.stateMutability,
    },
    createNodeId(`${parent.id} param ${param.name} >>> Solidity`),
    `Parameter`,
    parent
  )

module.exports = configPrepareTransformParam
