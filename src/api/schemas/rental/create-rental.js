'use strict'

const bodySchema = {
  type: 'object',
  required: ['title', 'location', 'price', 'bedrooms', 'bathrooms', 'property_type', 'description', 'image'],
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
  additionalProperties: false
}

module.exports = { bodySchema }
