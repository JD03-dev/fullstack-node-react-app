import express from 'express'
import { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController.js'
import auth from '../middleware/auth.js'
import roleCheck from '../middleware/roleCheck.js'

const router = express.Router()

router.post('/', auth, roleCheck(['admin']), createEmployee)
router.get('/', auth, getAllEmployees)
router.get('/:id', auth, getEmployeeById)
router.put('/:id', auth, roleCheck(['admin']), updateEmployee)
router.delete('/:id', auth, roleCheck(['admin']), deleteEmployee)

export default router
