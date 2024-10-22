import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRequestById, createRequest, updateRequest } from '../../services/request.service'
import { getEmployees } from '../../services/employee.service'

const RequestForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: '',
    summary: '',
    description: '',
    code: ''
  })
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    if (id) {
      fetchRequest()
    }
    fetchEmployees()
  }, [id])

  const fetchRequest = async () => {
    try {
      const request = await getRequestById(id)
      setFormData({
        employeeId: request.employee_id,
        summary: request.summary,
        description: request.description,
        code: request.code
      })
    } catch (error) {
      console.error('Error fetching request:', error)
    }
  }

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data.employees)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await updateRequest(id, formData)
      } else {
        await createRequest(formData)
      }
      navigate('/requests')
    } catch (error) {
      console.error('Error saving request:', error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          {id ? 'Editar Solicitud' : 'Nueva Solicitud'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="employee_id" className="sr-only">
                Seleccionar Empleado
              </label>
              <select
                id="employeeId"
                name="employeeId"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.employee_id}
                onChange={handleChange}
              >
                <option value="">Selecciona un empleado</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <spam className="sr-only">Tipo de Solicitud (Resumen)</spam>
              <select
                id="summary"
                name="summary"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.summary}
                onChange={handleChange}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Vacaciones">Vacaciones</option>
                <option value="Permiso">Permiso</option>
                <option value="Aumento">Aumento</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="sr-only">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {id ? 'Actualizar Solicitud' : 'Crear Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RequestForm
