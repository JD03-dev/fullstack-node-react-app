import { Routes, Route } from 'react-router-dom'
import EmployeeList from '../components/Employee/EmployeeList'
import EmployeeForm from '../components/Employee/EmployeeForm'

const Employees = () => {
  return (
    <Routes>
      <Route index element={<EmployeeList />} />
      <Route path="new" element={<EmployeeForm />} />
      <Route path=":id" element={<EmployeeForm />} />
    </Routes>
  )
}

export default Employees
