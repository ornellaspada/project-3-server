import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

// ? import models and data
import placesData from '../db/data/places.js'
import PlaceModel from '../models/placesModel.js'

import userData from '../db/data/user.js'
import UserModel from '../models/placesModel.js'

async function seedDataBase() {
  try {
    // ? wait for connection to mongo
    await connectToDb()
    console.log('🤖 connected you have!')

    // ? clear the db everytime you seed
    await mongoose.connection.db.dropDatabase()
    console.log('🤖 All places Removed')
    
    // ? create user
    const user = await UserModel.create(userData)
    console.log(`🤖 ${user.length} users created`)
    console.log(user)

    // ? seed my db with mongoose
    const place = await PlaceModel.create(placesData)
    console.log(`🤖  ${place.length} places created`)

    // ? disconnect once we have finished 
    await mongoose.connection.close()
    console.log('🤖 the server has disconnected all done kiddo')


  } catch (e) {
    console.log('🤖 Something went Wrong!')
    console.log(e)
    await mongoose.connection.close()
  }
}

seedDataBase()