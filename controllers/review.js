import PlaceModel from '../models/placeModel.js'

import { NotFound } from '../lib/error.js'

async function create(req, res, next) {
  req.body.user = req.currentUser
  try {
    const place = await PlaceModel.findById(req.params.placeId)
      .populate('user')
    
    if (!place) {
      throw new NotFound('No pokemon found.')
    }

    place.reviews.push(req.body)

    const savedPlace = await place.save()

    res.send(savedPlace)
  } catch (e) {
    next(e)
  }
}

export default {
  create,
}