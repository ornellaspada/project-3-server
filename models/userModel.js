import mongoose from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

// import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

userSchema.plugin(mongooseHidden({ defualtHidden: { password: true, _id: true } }))

export default mongoose.model('User', userSchema)