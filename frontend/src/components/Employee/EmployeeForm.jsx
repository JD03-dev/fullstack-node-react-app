import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee } from '../../services/employee.service';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    date_entry: '',
    salary: 0,
  });

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const  fetchEmployee = async () => {
    try {
      const employee = await getEmployeeById(parseInt(id));
      setFormData({
        name: employee.name,
        date_entry: employee.date_entry.split('T')[0],
        salary: employee.salary,
      });
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'salary' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(parseInt(id), formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          {id ? 'Editar Empleado' : 'Agregar Empleado'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="date_entry" className="sr-only">
                Fecha de Ingreso
              </label>
              <input
                id="date_entry"
                name="date_entry"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.date_entry}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="salary" className="sr-only">
                Salario
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                step="0.01"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Salario"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {id ? 'Actualizar Empleado' : 'Crear Empleado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
