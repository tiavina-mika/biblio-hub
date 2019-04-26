import app from 'express'
import bookExemplaireController from '../controllers/book-exemplaire'

const router = app.Router()

router.get('/api/book-exemplaires', bookExemplaireController.findAll)
router.post('/api/book-exemplaire', bookExemplaireController.create)
router.put('/api/book-exemplaire/:bookExemplaireId', bookExemplaireController.edit)
router.get('/api/book-exemplaire/:bookExemplaireId', bookExemplaireController.findOne)
router.delete('/api/book-exemplaire/:bookExemplaireId', bookExemplaireController.remove)

router.param('bookExemplaireId', bookExemplaireController.bookExemplaireByID)

export default router
