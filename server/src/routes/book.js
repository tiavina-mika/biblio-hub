import express from 'express'
import bookController from '../controllers/book'
import genreController from '../controllers/genre'
import authorController from '../controllers/author'
import upload from '../utils/book-files-upload'

const router = express.Router()

router.route('/api/books')
  .get(bookController.findAll)
  // .post(bookController.create)
  // .post(upload.single('photo'), bookController.create)
  .post(upload.fields([
		{ name: 'photo', maxCount: 1 }, 
		{ name: 'epub', maxCount: 1 },
		{ name: 'pdf', maxCount: 1 },
	]), bookController.create)

router.route('/api/books/photo/:bookId')
  .get(bookController.photo)
router.route('/api/books/pdf/:bookId')
  .get(bookController.pdf)
router.route('/api/books/epub/:bookId')
  .get(bookController.epub)

router.route('/api/books/by/:genreId')
  .get(bookController.listByGenre)
router.route('/api/books/from/:authorId')
  .get(bookController.listByAuthor)
router.route('/api/books/filter/:slug')
  .get(bookController.findOneBySlug)

router.route('/api/books/comment')
  .put(bookController.comment)
router.route('/api/books/uncomment')
  .put(bookController.uncomment)

router.route('/api/books/:bookId')
  .get(bookController.findOne)
  .put(upload.fields([
		{ name: 'photo', maxCount: 1 }, 
		{ name: 'epub', maxCount: 1 },
		{ name: 'pdf', maxCount: 1 },
	]), bookController.edit)
  .delete(bookController.remove)

router.param('bookId', bookController.bookByID)
router.param('genreId', genreController.genreByID)
router.param('authorId', authorController.authorByID)

export default router
