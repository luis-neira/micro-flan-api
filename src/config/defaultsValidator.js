'use strict'

const Ajv = require('ajv')

const ajvWithDefaults = new Ajv({ useDefaults: true })

const defaultSchema = {
  type: 'object',
  properties: {
    POSTGRES_PORT: { type: 'string', default: '5432' },
    PORT: { type: 'string', default: '3000' },
    LOG_LEVEL: { type: 'string', default: 'info' }
    // Add other defaultable properties if needed
  },
  additionalProperties: true
}

function getDefaultsValidator () {
  return ajvWithDefaults.compile(defaultSchema)
}

module.exports = getDefaultsValidator
