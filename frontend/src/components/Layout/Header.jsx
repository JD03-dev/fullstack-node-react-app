import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Mi Aplicación
            </Link>
            {user && (
              <div className="hidden ml-10 space-x-8 lg:block">
                {user.role === 'admin' && (
                  <Link to="/employees" className="text-base font-medium text-white hover:text-indigo-50">
                    Empleados
                  </Link>
                )}
                <Link to="/requests" className="text-base font-medium text-white hover:text-indigo-50">
                  Solicitudes
                </Link>
              </div>
            )}
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            {user && (
              <span className="text-white mr-4">
                {user.role === 'admin' ? 'Administrador' : 'Empleado'}
              </span>
            )}
            {user ? (
              <button
                onClick={logout}
                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/register"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Registrate
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
