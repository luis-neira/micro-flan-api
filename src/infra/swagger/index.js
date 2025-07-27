// swagger.js
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Express API', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'A sample API' // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/' // Base path (optional)
}

const options = {
  failOnErrors: true,
  swaggerDefinition,
  // Path to the APIs (adjust the pattern to your project)
  apis: [
    './src/api/rental/index.js',
    './src/api/tenant/index.js'
  ]
}

const specs = swaggerJsdoc(options)

module.exports = specs
