const Docker = require('dockerode')
const docker = new Docker()
const crypto = require('crypto')

async function startTestDb () {
  const containerName = 'test-db-' + crypto.randomBytes(4).toString('hex')
  const password = 'postgres'
  const port = 5433 // random, so you don't clash with local 5432

  // Start postgres container
  const container = await docker.createContainer({
    Image: 'postgres:15-alpine',
    name: containerName,
    Env: [`POSTGRES_PASSWORD=${password}`],
    HostConfig: {
      PortBindings: { '5432/tcp': [{ HostPort: `${port}` }] },
      AutoRemove: true
    }
  })

  await container.start()

  // Wait until pg is ready
  const { Client } = require('pg')
  const url = `postgres://postgres:${password}@localhost:${port}/postgres`

  console.log('⏳ Waiting for db...')
  let ready = false
  while (!ready) {
    try {
      const client = new Client({ connectionString: url })
      await client.connect()
      await client.end()
      ready = true
    } catch (e) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
  console.log('✅ DB ready!')

  return {
    container,
    connectionString: url,
    port,
    password
  }
}

module.exports = { startTestDb }
