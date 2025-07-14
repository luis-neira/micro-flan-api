'use strict'

const net = require('net')
const Docker = require('dockerode')
const config = require('@config')
const { Client } = require('pg')

function dockerConsole () {
  const docker = new Docker()

  return {
    async getRunningContainer (container) {
      const containers = await docker.listContainers()
      return containers.find(running => {
        return running.Names.some(name => name.includes(container.name))
      })
    },
    async startContainer (container) {
      const run = await this.getRunningContainer(container)
      if (!run) {
        await pullImage(container)
        const containerObj = await docker.createContainer(container)
        await containerObj.start()
      }
      //   await waitForPort('127.0.0.1', 5432, 30000)
      await waitForPostgres({
        host: '127.0.0.1',
        port: 5432, // or 5555 if you remap
        user: 'postgres',
        password: config.postgresPassword,
        database: 'postgres' // default
      })
    },
    async stopContainer (container) {
      const run = await this.getRunningContainer(container)
      if (run) {
        const containerObj = await docker.getContainer(run.Id)
        await containerObj.stop()
      }
    }
  }

  async function pullImage (container) {
    const pullStream = await docker.pull(container.Image)
    return new Promise((resolve, reject) => {
      docker.modem.followProgress(pullStream, onFinish)

      function onFinish (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    })
  }
}

const Containers = {
  postgres: {
    name: 'test-postgres',
    Image: 'postgres:17-alpine3.21',
    Env: [
        `POSTGRES_PASSWORD=${config.postgresPassword}`
    ],
    Tty: false,
    HostConfig: {
      PortBindings: {
        '5432/tcp': [{ HostIp: '0.0.0.0', HostPort: '5432' }]
      },
      AutoRemove: true
    }
  }
}

async function waitForPort (host, port, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    function tryConnect () {
      const socket = net.connect(port, host)
      socket.once('connect', () => {
        socket.destroy()
        resolve()
      })
      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for port ${port}`))
        } else {
          setTimeout(tryConnect, 100)
        }
      })
    }
    tryConnect()
  })
}

async function waitForPostgres (config, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    async function tryConnect () {
      const client = new Client(config)
      try {
        await client.connect()
        await client.end()
        resolve()
      } catch (e) {
        if (Date.now() - start > timeoutMs) {
          reject(new Error('Timed out waiting for Postgres'))
        } else {
          setTimeout(tryConnect, 200)
        }
      }
    }
    tryConnect()
  })
}

module.exports = dockerConsole
module.exports.Containers = Containers
module.exports.waitForPort = waitForPort
