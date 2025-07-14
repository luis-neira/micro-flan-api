'use strict'

require('module-alias/register')
const path = require('node:path')

const dotenv = require('dotenv')
const envPath = path.resolve(__dirname, '..', '.env.test')
dotenv.config({ path: envPath })

const dockerHelper = require('./helper-docker')

const docker = dockerHelper()
const { Containers } = dockerHelper

before(async function () {
  this.timeout(20000)
  await docker.startContainer(Containers.postgres)
  console.log('hi')
})

after(async function () {
  await docker.stopContainer(Containers.postgres)
  console.log('there')
})
