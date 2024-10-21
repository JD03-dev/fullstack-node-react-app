import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequestById, createRequest, updateRequest } from '../../services/request.service';

const RequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: '',
    type: '',
    description: '',
    date: '',
    status: 'Pendiente',
  });

  useEffect(() => {
    if (id) {
      fetchRequest();
    }
  }, [id]);

  const fetchRequest = async () => {
    try {
      const request = await getRequestById(id);
      setFormData({
        employee_id: request.employee_id,
        type: request.type,
        description: request.description,
        date: request.date.split('T')[0],
        status: request.status,
      });
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRequest(id, formData);
      } else {
        await createRequest(formData);
      }
      navigate('/requests');
    } catch (error) {
      console.error('Error saving request:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">
          {id ? 'Editar Solicitud' : 'Nueva Solicitud'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="employee_id" className="sr-only">
                ID del Empleado
              </label>
              <input
                id="employee_id"
                name="employee_id"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ID del Empleado"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="type" className="sr-only">
                Tipo de Solicitud
              </label>
              <select
                id="type"
                name="type"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Seleccione un tipo</option>
                <option value="Vacaciones">Vacaciones</option>
                <option value="Permiso">Permiso</option>
                <option value="Aumento">Aumento</option>
              </select>
            </div>
            <div>
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
            <div>
              <label htmlFor="date" className="sr-only">
                Fecha
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            {id && (
              <div>
                <label htmlFor="status" className="sr-only">
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Aprobada">Aprobada</option>
                  <option value="Rechazada">Rechazada</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {id ? 'Actualizar Solicitud' :   'Crear Solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
