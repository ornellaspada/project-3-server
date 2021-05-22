import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'

// ? import models and data
import placesData from '../db/data/places.js'
import PlaceModel from '../models/placeModel.js'

import usersData from '../db/data/user.js'
import UserModel from '../models/userModel.js'

async function seedDataBase() {
  try {
    // ? wait for connection to mongo
    await connectToDb()
    console.log('🤖 connected you have!')

    // ? clear the db everytime you seed
    await mongoose.connection.db.dropDatabase()
    console.log('🤖 All places Removed')
    
    // ? create user
    const users = await UserModel.create(usersData)
    console.log(`🤖 ${users.length} users created`)
    console.log(users)

    // ? Assign a user to each place..
    const placesDataWithUsers = placesData.map(place => {
      return { ...place, user: users[0]._id }
    })

    // ? seed my db with mongoose
    const places = await PlaceModel.create(placesDataWithUsers)
    console.log(`🤖  ${places.length} places created`)
    console.log(places)



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