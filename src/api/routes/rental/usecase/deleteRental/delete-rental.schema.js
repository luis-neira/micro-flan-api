'use strict'

const paramsSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' }
  },
  required: ['id'],
  additionalProperties: false
}

module.exports = { paramsSchema }
