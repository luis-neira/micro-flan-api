'use strict'

const config = require('../src/config')
const dockerHelper = require('./helper-docker')

const docker = dockerHelper()
const { Containers } = dockerHelper

exports.mochaGlobalSetup = async function () {
  await docker.startContainer(Containers.postgres, config)
  console.log('test db container running')
}

exports.mochaGlobalTeardown = async function () {
  await docker.stopContainer(Containers.postgres)
  console.log('test db container stopped!')
}
