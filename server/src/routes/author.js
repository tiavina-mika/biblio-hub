import express from 'express'
import authorController from '../controllers/author'

const router = express.Router()

router.route('/api/authors')
  .get(authorController.findAll)
  .post(authorController.create)

router.route('/api/authors/:authorId')
  .get(authorController.findOne)
  .put(authorController.edit)
  .delete(authorController.remove)

router.param('authorId', authorController.authorByID)

export default router