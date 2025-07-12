'use strict'

const request = require('supertest')
const chai = require('chai')
const setupTestApp = require('../../testSetup')

const { expect } = chai
let app = null
let container = null

before(async () => {
  const setup = await setupTestApp()
  app = setup.app
  container = setup.container
})

after(async () => {
  await container.dispose()
})

describe('POST /auth/login', () => {
  it('returns a valid token', (done) => {
    request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'password123'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        expect(res.body).to.have.property('token')
        done()
      })
  })
})
