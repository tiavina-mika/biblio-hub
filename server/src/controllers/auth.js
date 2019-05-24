import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user'
import sendEmail from '../mailer/send'
import sendEmailNotification from '../mailer/new-user'
import { validateSignin, validateSignup } from '../utils/validation'
import moment from 'moment'

const signup = async (req, res) => {
  try {
      const { isValid, errors } = validateSignup(req.body)
      if(!isValid) {
          return res.status(400).json(Object.keys(errors))
      }
      const user = await User.findOne({email : req.body.email})
      if (user && user.confirmed) {
        errors.EMAIL_WAS_USED = 'Email was used!'
        return res.status(400).json(Object.keys(errors))
      }
      if (user && !user.confirmed) {
        sendEmail(user.email, user.id)
        errors.EMAIL_WAITING_FOR_CONFIRMATION = 'Email was used and waiting for confiration!'
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
          Promise.all[
            sendEmail(result.email, result._id)
              .then(() => res.json({MAIL_CONFIRMATION_SEND_SUCCESS: `Email confirmation send successfully from ${process.env.USER_MAILER}`}))
              .catch(e => {
                errors.MAIL_CONFIRMATION_SEND_ERROR = 'Email confirmation send failed'
                res.status(400).json(Object.keys(errors))
              }),
            sendEmailNotification(result, 'Nouvel utilisateur').then(() => console.log('Email notification send successfully'))
          ]
          // res.status(200).json(result)
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
      if(!user) {
        errors.USER_NOT_FOUND = 'User not found'
        return res.status(400).json(Object.keys(errors))
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password)
      if (isMatch) {
          if(!user.confirmed) {
              errors.USER_NOT_CONFIRMED = 'User not confirmed'
              return res.status(400).json(Object.keys(errors))
          }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        sendEmailNotification(user, `${user.name} est connecté il y ${moment(new Date(user.createdAt)).fromNow()}`)
          .then(() => console.log('Email notification send successfully'))
        return res.json({
          success: true,
          token: token,
          isAdmin: user.role ==="ADMIN" ? true : false,
          user: {id: user._id, name: user.name, email: user.email, confirmed: user.confirmed},
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

export default {
  signin,
  signup,
  signout,
}
