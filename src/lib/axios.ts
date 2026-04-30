import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lms_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — clear session and redirect (but not if already on auth pages)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const onAuthPage = ['/login', '/register'].includes(window.location.pathname)
      if (!onAuthPage) {
        localStorage.removeItem('lms_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

export default api
