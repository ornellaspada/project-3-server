// ? setting our routes up

import express from 'express'

import placesController from '../controllers/places.js'
import userController from '../controllers/user.js'

const router = express.Router()

router.route('/places')
  .get(placesController.index)
  // .post(placesController.create)

router.route('/places/:placeId')
  .get(placesController.show)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router