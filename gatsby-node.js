/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.onCreateNode = ({ actions }) => {}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContract {
        nodes {
          id
          parent {
            ... on Source {
              childrenImportDirective {
                id
                relativePath
              }
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allContract.nodes.forEach(contract => {
      createPage({
        path: contract.id,
        component: path.resolve(`./src/templates/contract.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          id: contract.id,
          relativePaths: contract.parent.childrenImportDirective.map(
            importDirective => importDirective.relativePath
          ),
        },
      })
    })
  })
}
