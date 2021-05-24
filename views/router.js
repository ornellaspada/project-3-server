// ? setting our routes up

import express from 'express'
import placesController from '../controllers/places.js'
import userController from '../controllers/user.js'
import reviewController from '../controllers/review.js'

import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

// ? Get all places and create a place
router.route('/places')
  .get(placesController.index)
  .post(secureRoute, placesController.create)

// ? Searching for places
router.route('/places/search')
  .get(placesController.search)

// ? Get one place, update and delete a place
router.route('/places/:placeId')
  .get(placesController.show)
  .delete(secureRoute, placesController.remove)
  .put(secureRoute, placesController.update)

// ? Reviews
router.route('/places/:placeId/review')
  .post(secureRoute, reviewController.create)

// ? Users 
router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router
