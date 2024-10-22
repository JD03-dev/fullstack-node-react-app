import Request from '../models/request.js'
import { v4 as uuidv4 } from 'uuid'

export const createRequest = async (req, res) => {
  try {
    const { employeeId, summary, description } = req.body
    const uniqueCode = generateUniqueCode()

    const newRequest = await Request.create({
      employee_id: employeeId,
      summary,
      description,
      code: uniqueCode
    })

    res.status(201).json(newRequest)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const generateUniqueCode = () => {
  const timestamp = Date.now().toString(36)
  const randomStr = uuidv4().split('-')[0]
  return `REQ-${timestamp}-${randomStr}`.toUpperCase()
}

export const getAllRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const { count, rows } = await Request.findAndCountAll({
      limit,
      offset,
      include: 'Employee'
    })

    res.json({
      requests: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getRequestById = async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id, { include: 'Employee' })
    if (!request) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }
    res.json(request)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateRequest = async (req, res) => {
  try {
    const [updated] = await Request.update(req.body, {
      where: { id: req.params.id }
    })
    if (!updated) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }
    const updatedRequest = await Request.findByPk(req.params.id, { include: 'Employee' })
    res.json(updatedRequest)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteRequest = async (req, res) => {
  try {
    const deleted = await Request.destroy({
      where: { id: req.params.id }
    })
    if (!deleted) {
      return res.status(404).json({ error: 'Solicitud no encontrada' })
    }
    res.json({ message: 'Solicitud eliminada exitosamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
