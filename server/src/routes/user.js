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

// router.route('/api/users/photo/:userId')
//   .get(userController.photo)
router.route('/api/users/:userId/photo')
  .get(userController.profilePhoto)

router.route('/api/users/:userId')
  .get(userController.findOne)
  .put(upload.single('photo'), userController.edit)
  // .put(upload.single('photo'), authJwt, userController.edit)
  .delete(userController.remove)

router.route('/api/users/:userId/profile')
  .post(upload.single('photo'), userController.addProfile)

router.route('/api/users/:userId/profile/:profileId')
  .put(upload.single('photo'), userController.editProfile)

router.route('/api/users/set-admin/:userId')
  .put(userController.setAdmin)

router.route('/api/profiles')
  .get(userController.findAllProfile)
  .delete(userController.removeAll)

router.param('userId', userController.userByID)
router.param('profileId', userController.profileByID)

export default router
