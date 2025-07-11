'use strict'

const path = require('node:path')

const dotenv = require('dotenv')
const envPath = path.resolve(__dirname, '..', '.env.test')
dotenv.config({ path: envPath })
