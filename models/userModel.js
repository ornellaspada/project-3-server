import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'



const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true },
})

schema.pre('save', function encryptPassword(next) {

  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }

  next()
})

schema.methods.validatePassword = function valudatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}



schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))


export default mongoose.model('User', schema)