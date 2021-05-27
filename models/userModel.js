import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'



const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true , unique: true },
  password: { type: String, required: true },
  favourites: [{ type: mongoose.Schema.ObjectId, ref: 'PlaceModel', required: false }],
})

schema.pre('save', function encryptPassword(next) {

  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }

  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

// !!!!!!!!!!!!!!!!!!!!!!
// ? Password confirmation
schema

  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })
  
schema 
  .pre('validate', function checkPassword(next) {

    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })
// !!!!!!!!!!!!!!!!!!!!!!

// ***********************
// ? Email Confirmation
schema
  .virtual('emailConfirmation')
  .set(function setEmailConfirmation(emailConfirmation) {
    this._emailConfirmation = emailConfirmation
  }) 

schema
  .pre('validate', function checkEmail(next) {

    if (this.isModified('email') && (this.email !== this._emailConfirmation)) {
      this.invalidate('emailConfirmation', 'should match email')
    }
    next()
  })
// ***********************


schema.plugin(uniqueValidator)
schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))


export default mongoose.model('User', schema)
