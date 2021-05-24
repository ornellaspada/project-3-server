import mongoose from 'mongoose'
import { dbUrl } from '../config/environment.js'

export default function connectToDb() {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  return mongoose.connect(dbUrl, options)
}