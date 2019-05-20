import express from 'express'
import contactController from '../controllers/contact'

const router = express.Router()

router.route('/api/contact')
  .post(contactController.create)

export default router