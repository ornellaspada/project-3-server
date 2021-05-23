import PlaceModel from '../models/placeModel.js'

async function create(req, res, next) {
  req.body.user = req.currentUser
  try {
    const place = await PlaceModel.findById(req.params.placeId)
      .populate('user')
    
    if (!place) {
      return res.status(404).json({ message: 'No place found' })
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