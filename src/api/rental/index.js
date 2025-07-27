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
 *   RentalBase:
 *     type: object
 *     required:
 *       - title
 *       - location
 *       - price
 *       - bedrooms
 *       - bathrooms
 *       - property_type
 *       - description
 *       - image
 *     properties:
 *       title:
 *         type: string
 *         example: Cool Flat
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
 * definitions:
 *   UpdateRental:
 *     type: object
 *     description: Must include at least one property to update
 *     properties:
 *       title:
 *         type: string
 *         example: Super Cool Flat
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
 * definitions:
 *   NewRental:
 *     allOf:
 *       - $ref: '#/definitions/RentalBase'
 */

/**
 * @swagger
 * definitions:
 *   Rental:
 *     allOf:
 *       - $ref: '#/definitions/RentalBase'
 *       - type: object
 *         required:
 *           - id
 *         properties:
 *           id:
 *             type: integer
 *             example: 6
 */

/**
 * @swagger
 * tags:
 *   - name: Rentals
 *     description: Operations about rentals
 */

router.route('/')
  /**
   * @swagger
   * /rentals:
   *   get:
   *     summary: Returns a list of rentals, optionally filtered by property type
   *     tags: [Rentals]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: type
   *         in: query
   *         description: Filter rentals by property type (e.g., apartment, house)
   *         required: false
   *         type: string
   *         example: apartment
   *     responses:
   *       200:
   *         description: Successful response with list of rentals
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Rental'
   */
  .get(validate({ query: getRentalsSchema.querySchema }), api('getRentals'))

  /**
   * @swagger
   * /rentals:
   *   post:
   *     summary: Create a new rental
   *     tags: [Rentals]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: rental
   *         description: The rental to create
   *         required: true
   *         schema:
   *           $ref: '#/definitions/NewRental'
   *     responses:
   *       200:
   *         description: Successfully created rental
   *         schema:
   *           $ref: '#/definitions/Rental'
   */
  .post(validate({ body: createRentalSchema.bodySchema }), api('createRental'))

router.route('/:id')
  /**
   * @swagger
   * /rentals/{id}:
   *   patch:
   *     summary: Update a rental by ID
   *     tags: [Rentals]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         type: integer
   *         description: ID of the rental to update
   *         example: 2
   *       - in: body
   *         name: rental
   *         description: Fields to update (must include at least one)
   *         required: true
   *         schema:
   *           $ref: '#/definitions/UpdateRental'
   *     responses:
   *       200:
   *         description: Successfully updated rental
   *         schema:
   *           $ref: '#/definitions/Rental'
   *       404:
   *         description: Rental not found
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: Rental not found
   */
  .patch(validate({
    params: updateRentalSchema.paramsSchema,
    body: updateRentalSchema.bodySchema
  }), api('updateRental'))

  /**
   * @swagger
   * /rentals/{id}:
   *   delete:
   *     summary: Delete a rental by ID
   *     tags: [Rentals]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the rental to delete
   *         type: integer
   *         example: 2
   *     responses:
   *       200:
   *         description: Successfully deleted
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: Rental deleted successfully
   *       404:
   *         description: Rental not found
   *         schema:
   *           type: object
   *           properties:
   *             message:
   *               type: string
   *               example: Rental not found
   */
  .delete(validate({ params: deleteRentalSchema.paramsSchema }), api('deleteRental'))

router.route('/:id/tenants')
  /**
   * @swagger
   * /rentals/{id}/tenants:
   *   get:
   *     summary: Get tenants for a specific rental
   *     tags: [Tenants]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
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
