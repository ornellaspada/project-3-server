import PlaceModel from '../models/placeModel.js'

import { NotFound } from '../lib/error.js'

async function create(req, res, next) {
  req.body.user = req.currentUser

  try {
    const place = await PlaceModel.findById(req.params.placeId)
      .populate('user')
      .populate('reviews.user')
    console.log(place)
    if (!place) {
      throw new NotFound('No place found.')
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

async function update(req, res, next) {
  try {
    // ? grab params for placeId and commentId
    const { placeId, reviewId } = req.params

    // ? step 1 find place by placeId 
    const place = await PlaceModel.findById(placeId)
    console.log(place)

    if (!place) {
      throw new NotFound('No place Found.')
    }

    // ? step 2 find the comment by its reviewId
    // ? reviews is like an array, but with extra methods, like id, to get a review by its id
    const review = place.reviews.id(reviewId)
    console.log(review)

    // ? step 3 we need to check if the review is outs 
    // ? check user ID of currentUser with user id of the comment
    if (!req.currentUser._id.equals(review.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    // ? step 4 save review after updated
    review.set(req.body)
    const savedReview = await place.save()

    res.send(savedReview)

  } catch (e) {
    next(e)
  }
}

export default {
  create,
  update,
}