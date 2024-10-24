import api from './api'

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const register = async (username, password, role) => {
  try {
    const response = await api.post('/auth/register', { username, password, role })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
