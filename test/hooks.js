'use strict'

const dockerHelper = require('./helper-docker')

const docker = dockerHelper()
const { Containers } = dockerHelper

exports.mochaGlobalSetup = async function () {
//   this.timeout(20000)
  await docker.startContainer(Containers.postgres)
  console.log('container running on port 5432')
}

exports.mochaGlobalTeardown = async function () {
  await docker.stopContainer(Containers.postgres)
  console.log('container stopped!')
}
