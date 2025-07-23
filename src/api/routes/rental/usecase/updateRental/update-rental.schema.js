'use strict'

const paramsSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' }
  },
  required: ['id'],
  additionalProperties: false
}

const bodySchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    location: { type: 'string', minLength: 1 },
    price: { type: 'number', multipleOf: 0.01, minimum: 0 },
    bedrooms: { type: 'number', multipleOf: 1, minimum: 0 },
    bathrooms: { type: 'number', multipleOf: 1, minimum: 0 },
    property_type: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    image: { type: 'string', format: 'uri' }
  },
  additionalProperties: false,
  minProperties: 1
}

module.exports = { paramsSchema, bodySchema }
