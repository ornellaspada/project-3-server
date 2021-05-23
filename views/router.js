// ? setting our routes up

import express from 'express'
import placesController from '../controllers/places.js'
import userController from '../controllers/user.js'

const router = express.Router()

router.route('/places')
  .get(placesController.index)
  // .post(placesController.create)

// ? Searching for places
router.route('/places/search')
  .get(placesController.search)

router.route('/places/:placeId')
  .get(placesController.show)
  .delete(placesController.remove)
  .put(placesController.update)

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)



export default router