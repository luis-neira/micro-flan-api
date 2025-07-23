'use strict'

const querySchema = {
  type: 'object',
  properties: {
    type: { type: 'string', maxLength: 9 }
  },
  additionalProperties: false
}

module.exports = { querySchema }
