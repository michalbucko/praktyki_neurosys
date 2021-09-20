import Axios from 'axios'

export const axios = Axios.create({
  baseURL: 'http://localhost:4000',
})

axios.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  return { ...config, headers }
})

axios.interceptors.response.use(
  function respond(response) {
    return response
  },
  function err(error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.assign('/login')
    }
    return Promise.reject(error)
  }
)
