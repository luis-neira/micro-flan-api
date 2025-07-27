'use strict'

const express = require('express')
const awilixExpress = require('awilix-express')

const makeValidator = require('@middleware/validate')
const createRentalSchema = require('./usecase/createRental/create-rental.schema')
const getRentalsSchema = require('./usecase/getRental/get-rentals.schema')
const getRentalTenantsSchema = require('./usecase/getRentalTenants/get-rental-tenants.schema')
const deleteRentalSchema = require('./usecase/deleteRental/delete-rental.schema')
const updateRentalSchema = require('./usecase/updateRental/update-rental.schema')

const router = express.Router()

const { makeInvoker } = awilixExpress

const { validate } = makeValidator({
  allErrors: true,
  coerceTypes: true
})

const api = makeInvoker(cradle => ({
  getRentals: cradle.getRentalsController,
  createRental: cradle.createRentalController,
  updateRental: cradle.updateRentalController,
  deleteRental: cradle.deleteRentalController,
  getRentalTenants: cradle.getRentalTenantsController
}))

/**
 * @swagger
 * definitions:
 *   Rental:
 *     type: object
 *     required:
 *       - id
 *       - title
 *       - location
 *       - price
 *     properties:
 *       id:
 *         type: integer
 *         example: 1
 *       title:
 *         type: string
 *         example: Luxury Studio Apartment
 *       location:
 *         type: string
 *         example: New York, NY
 *       price:
 *         type: number
 *         example: 2500
 *       bedrooms:
 *         type: integer
 *         example: 1
 *       bathrooms:
 *         type: integer
 *         example: 1
 *       property_type:
 *         type: string
 *         example: apartment
 *       description:
 *         type: string
 *         example: A beautiful and spacious studio apartment with high-end finishes. The building amenities include a gym, pool, and rooftop lounge.
 *       image:
 *         type: string
 *         format: uri
 *         example: https://images.unsplash.com/photo-1729053809347-c27ce1269bc3
 */

/**
 * @swagger
 * tags:
 *   - name: Rentals
 *     description: Operations about rentals
 */

/**
 * @swagger
 * tags:
 *   - name: RentalTenants
 *     description: Get tenants for a specific rental
 */

router.route('/')
  /**
   * @swagger
   * /rentals:
   *   get:
   *     summary: Returns a list of rentals
   *     tags: [Rentals]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successful response
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Rental'
   */
  .get(validate({ query: getRentalsSchema.querySchema }), api('getRentals'))
  .post(validate({ body: createRentalSchema.bodySchema }), api('createRental'))

router.route('/:id')
  .patch(validate({
    params: updateRentalSchema.paramsSchema,
    body: updateRentalSchema.bodySchema
  }), api('updateRental'))
  .delete(validate({ params: deleteRentalSchema.paramsSchema }), api('deleteRental'))

router.route('/:id/tenants')
  /**
   * @swagger
   * /rentals/{rentalId}/tenants:
   *   get:
   *     summary: Get tenants for a specific rental
   *     tags: [RentalTenants]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: rentalId
   *         in: path
   *         required: true
   *         description: ID of the rental
   *         type: integer
   *         example: 1
   *     responses:
   *       200:
   *         description: List of tenants for the rental
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Tenant'
   */
  .get(validate({ params: getRentalTenantsSchema.paramsSchema }), api('getRentalTenants'))

module.exports = router
