import { Routes, Route } from 'react-router-dom'
import RequestList from '../components/Request/RequestList'
import RequestForm from '../components/Request/RequestForm'

const Requests = () => {
  return (
    <Routes>
      <Route index element={<RequestList />} />
      <Route path="new" element={<RequestForm />} />
      <Route path=":id" element={<RequestForm />} />
    </Routes>
  )
}

export default Requests
