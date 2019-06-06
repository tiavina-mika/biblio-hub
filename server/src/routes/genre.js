import express from 'express'
import genreController from '../controllers/genre'
import upload from '../utils/image-upload'
import { authJwt } from '../config/passport'

const router = express.Router()

router.route('/api/genres')
  .get(genreController.findAll)
  .post(authJwt, upload.single('photo'), genreController.create)

router.route('/api/genres/photo/:genreId')
  .get(genreController.photo)
router.route('/api/genres/filter/:slug')
  .get(genreController.findOneBySlug)
router.route('/api/genres/:genreId')
  .get(genreController.findOne)
  .put(authJwt, upload.single('photo'), genreController.edit)
  .delete(authJwt, genreController.remove)

router.param('genreId', genreController.genreByID)

export default router