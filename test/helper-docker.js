'use strict'

const Docker = require('dockerode')

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
    },
    async stopCpntainer (container) {
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
    Tty: false,
    HostConfig: {
      PortBindings: {
        '5555/tcp': [{ HostIp: '0.0.0.0', HostPort: '5555' }]
      },
      AutoRemove: true
    }
  }
}

module.exports = dockerConsole
module.exports.Containers = Containers
