"use strict"

const path = require(`path`)
const parser = require(`solidity-parser-antlr`)
const configTransformObject = require(`./transformObject.js`)
const configPrepareTransformParam = require(`./solidity/param.js`)

async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  const { createNode, createParentChildLink } = actions

  const transformObject = configTransformObject({
    createContentDigest,
    createNode,
    createParentChildLink,
  })

  const prepareTransformParam = configPrepareTransformParam({
    transformObject,
    createNodeId,
  })

  if (node.ext !== `.sol`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = parser.parse(content, { loc: true, range: true })
  parser.visit(parsedContent, {
    SourceUnit(ctx) {
      let sourceUnitNode = transformObject(
        { relativePath: node.relativePath },
        createNodeId(`${node.id} >>> Solidity`),
        `Source`,
        node
      )

      ctx.children.forEach(child => {
        child.parent = sourceUnitNode
      })
    },
  })

  parser.visit(parsedContent, {
    ImportDirective(ctx) {
      let contractDefinitionNode = transformObject(
        {
          path: ctx.path,
          relativePath: path
            .resolve(path.dirname(`/${ctx.parent.relativePath}`), ctx.path)
            .slice(1),
        },
        createNodeId(`${node.id} import ${ctx.path} >>> Solidity`),
        `ImportDirective`,
        ctx.parent
      )
    },
  })

  parser.visit(parsedContent, {
    ContractDefinition(ctx) {
      let contractDefinitionNode = transformObject(
        { name: ctx.name },
        createNodeId(`${node.id} contract ${ctx.name} >>> Solidity`),
        `Contract`,
        ctx.parent
      )
      ctx.baseContracts.forEach(baseContract =>
        transformObject(
          {
            name: baseContract.baseName.namePath,
          },
          createNodeId(
            `${node.id} contract ${ctx.name} inheritance ${baseContract.baseName.namePath} >>> Solidity`
          ),
          `BaseContract`,
          contractDefinitionNode
        )
      )
      ctx.subNodes.forEach(child => {
        child.parent = contractDefinitionNode
      })
    },
  })

  parser.visit(parsedContent, {
    ModifierDefinition(ctx) {
      let transformParam = prepareTransformParam(
        transformObject(
          {
            name: ctx.name,
            source: content.slice(ctx.range[0], ctx.range[1] + 1),
          },
          createNodeId(
            `${node.id} contract ${ctx.parent.name} modifier ${ctx.name} >>> Solidity`
          ),
          `ModifierDefinition`,
          ctx.parent
        )
      )
      if (ctx.parameters && ctx.parameters.parameters) {
        ctx.parameters.parameters.forEach(transformParam)
      }
    },
  })

  parser.visit(parsedContent, {
    EventDefinition(ctx) {
      let eventNode = transformObject(
        {
          name: ctx.name,
          source: content.slice(ctx.range[0], ctx.range[1] + 1),
        },
        createNodeId(
          `${node.id} contract ${ctx.parent.name} event ${ctx.name} >>> Solidity`
        ),
        `EventDefinition`,
        ctx.parent
      )
      if (ctx.parameters && ctx.parameters.parameters) {
        ctx.parameters.parameters.forEach(param =>
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
              constantKeyword: param.isDeclaredConst ? "constant" : "",
              isIndexed: param.isIndexed,
              visibility: param.visibility,
              stateMutability: param.typeName.stateMutability,
            },
            createNodeId(
              `${node.id} contract ${ctx.parent.name} event ${ctx.name} param ${param.name} >>> Solidity`
            ),
            `VariableDeclaration`,
            eventNode
          )
        )
      }
    },
  })

  parser.visit(parsedContent, {
    FunctionDefinition(ctx) {
      let functionNode = transformObject(
        {
          name: ctx.name,
          visibility: ctx.visibility,
          modifiers: ctx.modifiers,
          isConstructor: ctx.isConstructor,
          stateMutability: ctx.stateMutability,
          source: content.slice(ctx.range[0], ctx.range[1] + 1),
        },
        createNodeId(
          `${node.id} contract ${ctx.parent.name} function ${ctx.name} >>> Solidity`
        ),
        `FunctionDefinition`,
        ctx.parent
      )

      let transformParam = prepareTransformParam(functionNode)

      if (ctx.parameters) {
        ctx.parameters.parameters.forEach(transformParam)
      }

      ctx.modifiers.forEach(modifier => {
        let modifierNode = transformObject(
          { name: modifier.name },
          createNodeId(
            `${node.id} contract ${ctx.parent.name} function ${ctx.name} modifier ${modifier.name} >>> Solidity`
          ),
          `ModifierInvocation`,
          functionNode
        )
        if (modifier.arguments) {
          modifier.arguments.forEach(argument => {
            transformObject(
              { name: argument.name },
              createNodeId(
                `${node.id} contract ${ctx.parent.name} function ${ctx.name} modifier ${modifier.name} arg${argument.name} >>> Solidity`
              ),
              `ModifierArgument`,
              modifierNode
            )
          })
        }
      })

      if (ctx.returnParameters) {
        let transformParam = prepareTransformParam(
          transformObject(
            {},
            createNodeId(
              `${node.id} contract ${ctx.parent.name} function ${ctx.name} returns >>> Solidity`
            ),
            `Returns`,
            functionNode
          )
        )

        ctx.returnParameters.parameters.forEach(transformParam)
      }
    },
  })
}

exports.onCreateNode = onCreateNode
