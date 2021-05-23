// ? setting our routes up

import express from 'express'
import placesController from '../controllers/places.js'


const router = express.Router()

router.route('/places')
  .get(placesController.index)
  // .post(placesController.create)

router.route('/places/:placeId')
  .get(placesController.show)
  .delete(placesController.remove)
  .put(placesController.update)


export default router