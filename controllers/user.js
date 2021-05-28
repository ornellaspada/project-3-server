import { NotValid } from '../lib/error.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { secret } from '../config/environment.js'
import PlaceModel from '../models/placeModel.js'
// import places from '../db/data/places.js'

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
      { sub: user._id },
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
    
    // const favPlace = place.add(req.body.favourites)
    // console.log(favPlace)

    currentUser.save()

    res.status(202).json(place)


    
    
    //     if (!place) {
    //       throw new NotFound('No places found.')
    //     }
    
    //     if (!currentUserId.equals(place.user)) {
    //       return res.status(401).json({ message: 'Unauthorized' })
    //     }
        
    //     place.add(req.body)
    
    //     console.log(req.body)
    
    //     place.save()
    
    //     res.status(202).json(place)
    
  } catch (e) {
    next(e)
  }
}

export default {
  register,
  login,
  addFav,
}