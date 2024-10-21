import express from 'express'
import { createRequest, getAllRequests, getRequestById, updateRequest, deleteRequest } from '../controllers/requestController.js'
import auth from '../middleware/auth.js'
import roleCheck from '../middleware/roleCheck.js'

const router = express.Router()

router.post('/', auth, createRequest)
router.get('/', auth, getAllRequests)
router.get('/:id', auth, getRequestById)
router.put('/:id', auth, roleCheck(['admin']), updateRequest)
router.delete('/:id', auth, roleCheck(['admin']), deleteRequest)

export default router
