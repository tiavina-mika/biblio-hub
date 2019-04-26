import express from 'express'
import passport from 'passport'
import userController from '../controllers/user'
import authController from '../controllers/auth'
import { authJwt } from '../config/passport'

const router = express.Router()

router.route('/api/users')
  .get(userController.findAll)
  .post(userController.create)

  router.route('/api/users/:userId')
  .get(userController.findOne)
  .put(authJwt, userController.edit)
  .delete(userController.remove)

router.route('/api/users/set-admin/:userId')
  .put(userController.setAdmin)

router.param('userId', userController.userByID)

export default router
