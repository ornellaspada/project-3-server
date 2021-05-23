import PlaceModel from '../models/placeModel.js'

// ? function to GET all places 
async function index(req, res, next) {
  try {
    const placesList = await PlaceModel.find().populate('user')
    console.log(placesList)
    // ? res obj allows us to send back data like so 
    res.status(200).json(placesList)
  } catch (error) {
    next(error)
  }
}

// ? function to GET only one place
async function show(req, res, next) {
  try {
    const placeId = req.params.placeId
    const place = await PlaceModel.findById(placeId).populate('user')
    console.log(place)
    
    if (!place) {
      return res.status(404).json({ message: 'No place found' })
    }

    res.status(200).json(place)
  } catch (e) {
    next(e)
  }
}

export default {
  index,
  show,
}