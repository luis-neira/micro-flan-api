'use strict'

const fullSchema = {
  type: 'object',
  properties: {
    POSTGRES_PASSWORD: { type: 'string' },
    POSTGRES_DB: { type: 'string' },
    POSTGRES_HOST: { type: 'string' },
    POSTGRES_PORT: { type: 'string' },
    POSTGRES_USER: { type: 'string' },
    PORT: { type: 'string' },
    JWT_SECRET: { type: 'string' },
    ENABLE_STACK_TRACE: { type: 'string' },
    ENABLE_SERVER_LOGGING: { type: 'string' },
    DB_ENV: { type: 'string' },
    ENABLE_CORS: { type: 'string' }
  },
  required: ['DB_ENV'],
  if: {
    properties: {
      DB_ENV: { const: 'test' }
    }
  },
  then: {
    required: ['ENABLE_SERVER_LOGGING']
  },
  else: {
    required: [
      'POSTGRES_PASSWORD',
      'POSTGRES_DB',
      'POSTGRES_HOST',
      'POSTGRES_PORT',
      'POSTGRES_USER',
      'PORT',
      'JWT_SECRET',
      'ENABLE_STACK_TRACE',
      'ENABLE_SERVER_LOGGING',
      'DB_ENV',
      'ENABLE_CORS'
    ]
  },
  additionalProperties: true
}

module.exports.fullSchema = fullSchema
