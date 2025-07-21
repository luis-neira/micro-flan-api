'use strict'

const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const ajv = new Ajv({ allErrors: true }) // You can add options like coerceTypes, useDefaults, etc.
addFormats(ajv)

function validate (schema, property = 'body') {
  const validateFn = ajv.compile(schema)

  return (req, res, next) => {
    const valid = validateFn(req[property])
    if (!valid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validateFn.errors
      })
    }
    next()
  }
}

module.exports = validate
