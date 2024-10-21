import Employee from '../models/employee.js'

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(201).json(employee)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const { count, rows } = await Employee.findAndCountAll({
      limit,
      offset
    })

    res.json({
      employees: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id)
    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' })
    }
    res.json(employee)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    })
    if (!updated) {
      return res.status(404).json({ error: 'Empleado no encontrado' })
    }
    const updatedEmployee = await Employee.findByPk(req.params.id)
    res.json(updatedEmployee)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    })
    if (!deleted) {
      return res.status(404).json({ error: 'Empleado no encontrado' })
    }
    res.json({ message: 'Empleado eliminado exitosamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
