import express from 'express'
import authorController from '../controllers/author'
import upload from '../utils/image-upload'

const router = express.Router()

router.route('/api/authors')
  .get(authorController.findAll)
  .post(upload.single('photo'), authorController.create)

router.route('/api/authors/photo/:authorId')
  .get(authorController.photo)
router.route('/api/authors/filter/:slug')
  .get(authorController.findOneBySlug)
router.route('/api/authors/:authorId')
  .get(authorController.findOne)
  .put(upload.single('photo'), authorController.edit)
  .delete(authorController.remove)

router.param('authorId', authorController.authorByID)

export default router