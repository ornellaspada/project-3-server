import PlaceModel from '../models/placeModel.js'


import { NotFound } from '../lib/error.js'


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


// ? function SEARCH 
async function search(req, res, next) {
  try {
    console.log('working')
    const searchParams = req.query
    console.log(searchParams)

    // ? To match exact values. (can add more logic here to match substrings)
    const placesList = await PlaceModel.find(searchParams).populate('user')

    res.status(200).json(placesList)
  } catch (e) {
    next(e)
  }
}


// ? function to GET only one place
async function show(req, res, next) {
  try {
    const placeId = req.params.placeId
    const place = await PlaceModel.findById(placeId).populate('user')
    console.log(place)
    
    if (!place) {
      throw new NotFound('No pokemon found.')
    }

    res.status(200).json(place)
  } catch (e) {
    next(e)
  }
}
// ? Function to create a place 
async function create(req, res, next){
  req.body.user = req.currentUser
  try {
    const newPlace = await PlaceModel.create(req.body)
    res.status(201).json(newPlace)
  } catch (e){
    next(e)
  }
}
// ? function for removing
async function remove(req, res, next) {
  try {
    // ? get user id
    // const currentUserId = req.currentUserId._id
    // // ? get team data we might remove
    // console.log(currentUserId)
    const place = await PlaceModel.findById(req.params.placeId)
    console.log(place)
    // ? you cant delete a place that doesn't exist
    // if (!currentUserId) {
    //   throw new NotFound('no place found')
    // }
    
    // ? check id of user whos trying to deled again and user id on team it self
    // if (!currentUserId.equals(place.user)) {
    //   return res.status(401).json({ message: 'Unauthorized' })
    // }
    // ? if that stage is passed the user has a place they created and therefore can be deleted
    await place.deleteOne()

    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
}

async function update(req, res, next) {
  try { 
    const placeId = req.params.placeId
    const body = req.body

    const updatePlace = await PlaceModel.findByIdAndUpdate(placeId, body, { new: true })
    console.log(updatePlace)

    updatePlace.save() 
    
    res.status(202).json(updatePlace)
    
  } catch (e) {
    next(e)
  }
}


export default {
  index,
  create,
  show,
  remove,
  update,
  search,
}