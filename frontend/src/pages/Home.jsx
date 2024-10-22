import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Bienvenido a la aplicación</h1>
        <p className="mt-4 text-lg text-gray-500">
          Selecciona una opción para comenzar:
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {user.role === 'admin' && (
            <Link
              to="/employees"
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
            >
              <h2 className="text-xl font-semibold text-indigo-600">Empleados</h2>
              <p className="mt-2 text-gray-500">Gestiona la información de los empleados</p>
            </Link>
          )}
          <Link
            to="/requests"
            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold text-indigo-600">Solicitudes</h2>
            <p className="mt-2 text-gray-500">Administra las solicitudes de los empleados</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
