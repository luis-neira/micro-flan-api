'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

const router = express.Router()

const { makeInvoker } = awilixExpress

const api = makeInvoker(cradle => ({
  getTenants: cradle.getTenantsController
}))

/**
 * @swagger
 * definitions:
 *   Tenant:
 *     type: object
 *     required:
 *       - id
 *       - firstname
 *       - lastname
 *       - email
 *       - password
 *       - age
 *       - rental_id
 *     properties:
 *       id:
 *         type: integer
 *         example: 1
 *       firstname:
 *         type: string
 *         example: John
 *       lastname:
 *         type: string
 *         example: Doe
 *       email:
 *         type: string
 *         format: email
 *         example: john.doe@email.com
 *       password:
 *         type: string
 *         example: azerty
 *       age:
 *         type: integer
 *         example: 42
 *       rental_id:
 *         type: integer
 *         example: 2
 */

/**
 * @swagger
 * tags:
 *   - name: Tenants
 *     description: Operations about tenants
 */

router.route('/')
  /**
   * @swagger
   * /tenants:
   *   get:
   *     summary: Returns a list of tenants
   *     tags: [Tenants]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successful response
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Tenant'
   */
  .get(api('getTenants'))

module.exports = router
