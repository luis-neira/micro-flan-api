'use strict'

const chai = require('chai')
const request = require('supertest')
const setupTestApp = require('@testSetup')

let app = null
let container = null
let knex = null

describe('GET /tenants', () => {
  before(async () => {
    const setup = await setupTestApp()
    app = setup.app
    container = setup.container
    knex = setup.knex
  })

  after(async () => {
    await knex.migrate.rollback({}, true)
    await knex.destroy()
    await container.dispose()
  })

  it('gets all tenants', (done) => {
    request(app)
      .get('/tenants')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body.length).to.be.eql(4)

        done()
      })
  })
})
