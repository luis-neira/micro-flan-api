'use strict'

const { Validator } = require('express-json-validator-middleware')
const addFormats = require('ajv-formats')

function makeValidator (opts) {
  const validator = new Validator(opts)
  addFormats(validator.ajv)
  return validator
}

module.exports = makeValidator
