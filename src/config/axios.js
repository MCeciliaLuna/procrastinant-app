import axios from 'axios'
import {useAuthStore} from '../stores/authStore'
import {useUIStore} from '../stores/uiStore'
import {API_BASE_URL} from './env'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    useUIStore.getState().setLoading(true)
    return config
  },
  (error) => {
    useUIStore.getState().setLoading(false)
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => {
    useUIStore.getState().setLoading(false)
    return response
  },
  (error) => {
    useUIStore.getState().setLoading(false)
    if (error.response) {
      const isAuthEndpoint =
        error.config?.url?.includes('/auth/login') || error.config?.url?.includes('/auth/register')

      const isDeleteAccountEndpoint = error.config?.url?.includes('/user/account')

      const isChangePasswordEndpoint = error.config?.url?.includes('/user/password')

      switch (error.response.status) {
      case 401:
        if (!isAuthEndpoint && !isDeleteAccountEndpoint && !isChangePasswordEndpoint) {
          console.error('Sesión expirada o no autenticado')
          useAuthStore.getState().logout()
        }
        break

      case 403:
        console.error('No tienes permisos para esta acción')
        break

      case 404:
        console.error('Recurso no encontrado')
        break

      case 429:
        console.error('Demasiadas peticiones. Por favor, intenta más tarde.')
        break

      case 500:
        console.error('Error del servidor. Por favor, intenta más tarde')
        break

      default:
        console.error(
          'Error en la petición:',
          error.response.data?.message || 'Error desconocido',
        )
      }
    } else if (error.request) {
      console.error('No hay respuesta del servidor. Verifica tu conexión a internet')
    } else {
      console.error('Error al configurar la petición:', error.message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
