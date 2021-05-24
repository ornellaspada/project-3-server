import PlaceModel from '../models/placeModel.js'

async function create(req, res, next) {
  req.body.user = req.currentUser
  console.log('working!')
  try {
    const place = await PlaceModel.findById(req.params.placeId)
      .populate('user')
      .populate('reviews.user')
    console.log(place)
    if (!place) {
      return res.status(404).json({ message: 'No place found' })
    }

    place.reviews.push(req.body)
    console.log(place.reviews)

    const savedPlace = await place.save()
    console.log(savedPlace)

    res.send(savedPlace)
  } catch (e) {
    next(e)
  }
}

export default {
  create,
}