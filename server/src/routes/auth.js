import express from 'express'
import authController from '../controllers/auth'
import { authLocal } from '../config/passport'

const router = express.Router()

router.route('/auth/signin')
  .post(authLocal, authController.signin)
router.route('/auth/signup')
  .post(authController.signup)
router.route('/auth/signout')
  .get(authController.signout)

export default router
