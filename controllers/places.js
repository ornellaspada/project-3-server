import Places from '../models/placesModel.js'

async function index(req, res, next) {
  try {
    const PlacesList = await Places.find()
    // ? res obj allows us to send back data like so 
    res.status(200).json(PlacesList)
  } catch (error) {
    next(error)
  }
}

export default {
  index,
}