// ? setting our routes up

import express from 'express'

import placesController from '../controllers/places.js'


const router = express.Router()

router.route('/places')
  .get(placesController.index)
  // .post(placesController.create)

// ? Searching for places
router.route('/places/search')
  .get(placesController.search)

router.route('/places/:placeId')
  .get(placesController.show)




export default router