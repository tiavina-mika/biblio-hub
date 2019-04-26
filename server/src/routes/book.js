import express from 'express'
import bookController from '../controllers/book'
import genreController from '../controllers/genre'
import authorController from '../controllers/author'

const router = express.Router()

router.route('/api/books')
  .get(bookController.findAll)
  .post(bookController.create)

router.route('/api/books/by/:genreId')
  .get(bookController.listByGenre)
router.route('/api/books/from/:authorId')
  .get(bookController.listByAuthor)

router.route('/api/books/:bookId')
  .get(bookController.findOne)
  .put(bookController.edit)
  .delete(bookController.remove)

router.param('bookId', bookController.bookByID)
router.param('genreId', genreController.genreByID)
router.param('authorId', authorController.authorByID)

export default router
