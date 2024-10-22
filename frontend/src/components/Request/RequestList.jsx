import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRequests, deleteRequest } from '../../services/request.service'
import Alert from '../Common/alert'

const RequestList = () => {
  const [requests, setRequests] = useState([])
  const [alertOpen, setAlertOpen] = useState(false)
  const [requestToDelete, setRequestToDelete] = useState(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const data = await getRequests()
      setRequests(data.requests)
    } catch (error) {
      console.error('Error fetching requests:', error)
    }
  }

  const handleDeleteClick = (request) => {
    setRequestToDelete(request)
    setAlertOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (requestToDelete) {
      try {
        await deleteRequest(requestToDelete.id)
        setRequests(requests.filter(req => req.id !== requestToDelete.id))
      } catch (error) {
        console.error('Error deleting request:', error)
      }
    }
    setAlertOpen(false)
    setRequestToDelete(null)
  }

  const handleAlertClose = () => {
    setAlertOpen(false)
    setRequestToDelete(null)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Lista de Solicitudes</h1>
        <div className="mt-4">
          <Link
            to="/requests/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Nueva Solicitud
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
                        Empleado
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resumen
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.Employee?.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{request.summary}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/requests/${request.id}`} className="text-indigo-600 hover:text-indigo-900 mr-5">
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(request)}
                            className="text-red-600 hover:text-red-900"
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
        message={`¿Estás seguro de que quieres eliminar la solicitud de ${requestToDelete?.employee_name}?`}
      />
    </div>
  )
}

export default RequestList
