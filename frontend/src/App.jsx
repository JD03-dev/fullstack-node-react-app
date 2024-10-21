import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Layout/Header'
import PrivateRoute from './components/Layout/PrivateRoute'
import Loading from './components/Common/Loading'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./components/Auth/Login'))
const Employees = lazy(() => import('./pages/Employees'))
// const Requests = lazy(() => import('./pages/Requests'))

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home />} />
                <Route path="employees/*" element={<Employees />} />
                {/* <Route path="requests/*" element={<Requests />} /> */}
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
