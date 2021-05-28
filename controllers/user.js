import { NotValid } from '../lib/error.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { secret } from '../config/environment.js'
import PlaceModel from '../models/placeModel.js'
import places from '../db/data/places.js'

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (e){
    next(e)
  }
}

async function login(req, res, next) {

  try {
  
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      throw new NotValid('These login details were invalid')
    }
    const isValidPw = user.validatePassword(req.body.password)
    if (!isValidPw) {
      throw new NotValid('these login details were invalid')
    }

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )


    console.log('Success!!!')
    res.status(202).json({ message: 'Login successful', token })
  } catch (e) {
    next(e)
  }

  
}

// ? function to add to Myfavourites
async function addFav(req, res, next) {
  try { 
    const currentUser = req.currentUser
    console.log(currentUser)

    const place = await PlaceModel.findById(req.params.placeId)
    console.log(place)
    if (currentUser.favourites.includes(req.params.placeId)){
      console.log('already a fav')
    } else {
      currentUser.favourites.push(place)
    }
    console.log(currentUser.favourites)

    currentUser.save()

    res.status(202).json(place) 
  } catch (e) {
    next(e)
  }
}

async function removeFav(req, res, next) {
  try { 
    const currentUser = req.currentUser
    console.log(currentUser)

    const place = await PlaceModel.findById(req.params.placeId)
    console.log(place)
    if (currentUser.favourites.includes(req.params.placeId)){
      const favIndex = currentUser.favourites.findIndex((element)=>{
        return req.params.placeId === element
      })
      currentUser.favourites.splice( favIndex, 1 )
    } else {
      return res.status(202).json({ 'message': 'There are not FavPlaces' }) 
    }
    // console.log(currentUser.favourites)

    currentUser.save()
    console.log(currentUser)

    res.status(202).json({ 'message': 'Your FavPlace is been deleted' }) 
  } catch (e) {
    next(e)
  }
}

async function checkFav(req, res, next){
  try {
    const currentUser = req.currentUser
    console.log(currentUser)

    const isFav = currentUser.favourites.includes(req.params.placeId)
    res.status(202).json({ isFav }) 
  } catch (e) {
    next(e)
  }
}

async function showMyFavs (req, res, next){
  try {
    // const currentUser = req.currentUser.populate('favourites')
    // console.log(currentUser)
    const currentUser = await  User.findById(req.currentUser._id).populate('favourites')
   
    res.status(200).json(currentUser.favourites) 
  } catch (e) {
    next(e)
  }
} 

// await comment.remove()

// const updatedTurtle = await turtle.save()

// res.send(updatedTurtle)
export default {
  register,
  login,
  addFav,
  removeFav,
  checkFav,
  showMyFavs,
}