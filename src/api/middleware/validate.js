'use strict'

const Ajv = require('ajv')

const ajv = new Ajv({ allErrors: true }) // You can add options like coerceTypes, useDefaults, etc.

function validate (schema) {
  const validateFn = ajv.compile(schema)

  return (req, res, next) => {
    const valid = validateFn(req.body)
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
