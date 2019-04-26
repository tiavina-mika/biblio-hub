import express from 'express'
import genreController from '../controllers/genre'

const router = express.Router()

router.route('/api/genres')
  .get(genreController.findAll)
  .post(genreController.create)

router.route('/api/genres/:genreId')
  .get(genreController.findOne)
  .put(genreController.edit)
  .delete(genreController.remove)

router.param('genreId', genreController.genreByID)

export default router