import express from 'express'
import passport from 'passport'
import userController from '../controllers/user'
import authController from '../controllers/auth'
import { authJwt } from '../config/passport'
import upload from '../utils/image-upload'

const router = express.Router()

router.route('/api/users')
  .get(userController.findAll)
  .post(upload.single('photo'), userController.create)

router.route('/api/users/:userId')
  .get(userController.findOne)
  .put(upload.single('photo'), userController.edit)
  .delete(userController.remove)

router.route('/api/users/profile/:userId')
  .put(upload.single('photo'), userController.profile)
router.route('/api/users/photo/:userId')
  .get(userController.photo)

router.route('/api/users/set-admin/:userId')
  .put(userController.setAdmin)

router.route('/api/profiles')
  .get(userController.findAllProfile)
  .delete(userController.removeAll)

router.param('userId', userController.userByID)

export default router
