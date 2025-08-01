'use strict'

const chai = require('chai')
const request = require('supertest')
const setupTestApp = require('@testSetup')

let app = null
let container = null
let knex = null

describe('GET /rentals', () => {
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

  it('gets all rentals', (done) => {
    request(app)
      .get('/rentals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body.length).to.be.eql(5)

        done()
      })
  })

  it('gets all house rentals', (done) => {
    request(app)
      .get('/rentals')
      .query({ type: 'house' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body.length).to.be.eql(2)
        for (const rental of res.body) {
          chai.expect(rental).to.have.property('property_type', 'house')
        }

        done()
      })
  })

  it('gets all apartment rentals', (done) => {
    request(app)
      .get('/rentals')
      .query({ type: 'apartment' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body.length).to.be.eql(3)
        for (const rental of res.body) {
          chai.expect(rental).to.have.property('property_type', 'apartment')
        }

        done()
      })
  })
})

describe('POST /rentals', () => {
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

  it('add rental', (done) => {
    request(app)
      .post('/rentals')
      .send({
        title: 'Student Studio',
        location: 'Paris, FR',
        price: 900,
        bedrooms: 1,
        bathrooms: 1,
        property_type: 'apartment',
        description:
          "Small but functional studio, great for students or holidays in France's capital !",
        image: 'https://www.example.com/student-studio.jpg'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.eql({
          id: 6,
          title: 'Student Studio',
          location: 'Paris, FR',
          price: 900,
          bedrooms: 1,
          bathrooms: 1,
          property_type: 'apartment',
          description:
            "Small but functional studio, great for students or holidays in France's capital !",
          image: 'https://www.example.com/student-studio.jpg'
        })

        done()
      })
  })
})

describe('PATCH /rentals/:id', () => {
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

  it('edit rental by ID', (done) => {
    const id = 5

    const newData = {
      title: 'Student Studio',
      location: 'Paris, FR',
      price: 900,
      bedrooms: 1,
      bathrooms: 1,
      property_type: 'apartment',
      description:
        "Small but VERY VERY functional studio, great for students or holidays in France's capital !",
      image: 'https://www.example.com/student-studio.jpg'
    }

    const returnData = { ...newData, id }

    request(app)
      .patch(`/rentals/${id}`)
      .send(newData)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.eql(returnData)

        done()
      })
  })
})

describe('DELETE /rentals/:id', () => {
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

  it('delete rental by ID', (done) => {
    request(app)
      .delete('/rentals/5')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err)
        }

        done()
      })
  })

  it('return error if rental does not exist', (done) => {
    request(app)
      .delete('/rentals/1000')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err)
        }

        done()
      })
  })
})

describe('GET /rentals/1/tenants', () => {
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

  it('gets all tenents per rental', (done) => {
    request(app)
      .get('/rentals/1/tenants')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body.length).to.be.eql(2)
        for (const rental of res.body) {
          chai.expect(rental).to.have.property('rental_id', 1)
        }

        done()
      })
  })
})
