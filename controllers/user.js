import { NotValid } from '../lib/error.js'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { secret } from '../config/environment.js'

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

export default {
  register,
  login,
}