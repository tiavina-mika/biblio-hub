import express from 'express'
import contactController from '../controllers/contact'

const router = express.Router()

router.route('/api/contact')
  .post(contactController.create)
router.route('/api/confirm/:id')
  .get(contactController.confirm)

export default router