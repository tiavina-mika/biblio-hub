import express from 'express'
import genreController from '../controllers/genre'
import upload from '../utils/image-upload'

const router = express.Router()

router.route('/api/genres')
  .get(genreController.findAll)
  .post(upload.single('photo'), genreController.create)

router.route('/api/genres/photo/:genreId')
  .get(genreController.photo)
router.route('/api/genres/filter/:slug')
  .get(genreController.findOneBySlug)
router.route('/api/genres/:genreId')
  .get(genreController.findOne)
  .put(upload.single('photo'), genreController.edit)
  .delete(genreController.remove)

router.param('genreId', genreController.genreByID)

export default router