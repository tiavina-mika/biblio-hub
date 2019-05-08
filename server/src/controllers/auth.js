import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import { validateSignin, validateSignup } from '../utils/validation'

const signup = async (req, res) => {
  try {
      const { isValid, errors } = validateSignup(req.body)
      if(!isValid) {
          return res.status(400).json(Object.keys(errors))
      }
      const user = await User.findOne({email : req.body.email})
      if (user) {
        errors.EMAIL_WAS_USED = 'Email was used!'
        return res.status(400).json(Object.keys(errors))
      }
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          const newUser = new User(req.body)
          newUser.password = hash
          if (newUser.email === process.env.ADMIN_EMAIL) {
            newUser.role = 'ADMIN'
          }
          const result = await newUser.save()
          res.status(200).json(result)
        })
      })
  } catch (error) {
      res.status(401).json(error)
  }
}


const signin = async (req, res) => {
  try {
      const { isValid, errors } = validateSignin(req.body)
      if(!isValid) {
          return res.status(400).json(Object.keys(errors))
      }
      const user = req.user
      // const user = await User.findOne({email : req.body.email})
      if(!user) {
        errors.USER_NOT_FOUND = 'User not found'
        return res.status(400).json(Object.keys(errors))
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password)
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.json({
          success: true,
          token: token,
          isAdmin: user.role ==="ADMIN" ? true : false,
          user: {id: user._id, name: user.name, email: user.email }
        })
      } else {
        errors.INCORRECT_PASSWORD = 'Password is incorrect'
        return res.status(400).json(Object.keys(errors))
      }

  } catch (error) {
    // const errors = {INVALID_CREDENTIALS: 'Invalid credentials'}
    //   res.status(400).json(Object.keys(errors))
    res.status(401).json(error)
  }
}
const signout = (req, res) => {
  // res.clearCookie("t")
  return res.status(200).json({
    message: "signed out"
  })
}

const hasAuthorization = (req, res, next) => {
  const authorized = req.user && req.auth && req.user._id == req.auth._id
  if (!(authorized)) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  signin,
  signup,
  signout,
  hasAuthorization
}
