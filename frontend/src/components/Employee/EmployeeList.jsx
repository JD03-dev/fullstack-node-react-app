import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getEmployees, deleteEmployee } from '../../services/employee.service'
import { useAuth } from '../../context/AuthContext'
import Alert from '../Common/alert'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const { user } = useAuth()
  const [alertOpen, setAlertOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchEmployees()
    }
  }, [user])

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data.employees)
    } catch (error) {
      console.error('Error fetching employees:', error)
    }
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setAlertOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete.id)
        setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id))
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }
    setAlertOpen(false)
    setEmployeeToDelete(null)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
    setEmployeeToDelete(null)
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Lista de Empleados</h1>
        <div className="mt-4">
          <Link
            to="/employees/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Agregar Empleado
          </Link>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de Ingreso
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Salario
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{new Date(employee.date_entry).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">${employee.salary.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/employees/${employee.id}`} className="text-indigo-600 hover:text-indigo-900 mr-5">
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(employee)}
                            className="text-red-600 hover:text-red-900 "
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Alert
        isOpen={alertOpen}
        onClose={handleAlertClose}
        onConfirm={handleDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar al empleado ${employeeToDelete?.name}?`}
      />
    </div>
  )
}

export default EmployeeList
