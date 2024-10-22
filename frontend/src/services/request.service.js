import api from './api'

export const getRequests = async () => {
  const response = await api.get('/requests')
  return response.data
}

export const getRequestById = async (id) => {
  const response = await api.get(`/requests/${id}`)
  return response.data
}

export const createRequest = async (requestData) => {
  const response = await api.post('/requests', requestData)
  return response.data
}

export const updateRequest = async (id, requestData) => {
  const response = await api.put(`/requests/${id}`, requestData)
  return response.data
}

export const deleteRequest = async (id) => {
  const response = await api.delete(`/requests/${id}`)
  return response.data
}
