import {useAuthStore} from '../stores/authStore'
import * as authService from '../features/autenticacion/services/authService'
import {useToast} from './useToast'

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    login: loginStore,
    logout: logoutStore,
    updateUser: updateUserStore,
  } = useAuthStore()
  const {showSuccess, showError} = useToast()

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)

      if (response.success) {
        loginStore(response.user, response.token)
        showSuccess('¡Bienvenido de vuelta!')
        return true
      }

      return false
    } catch (error) {
      showError(error.message || 'Error al iniciar sesión')
      return false
    }
  }
  const register = async (userData) => {
    try {
      const response = await authService.register(userData)

      if (response.success) {
        loginStore(response.user, response.token)
        showSuccess('¡Cuenta creada exitosamente!')
        return true
      }

      return false
    } catch (error) {
      showError(error.message || 'Error al registrar usuario')
      return false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      logoutStore()
      showSuccess('Sesión cerrada')
    } catch (error) {
      logoutStore()
      console.error('Error al cerrar sesión:', error)
    }
  }

  const updateUser = (userData) => {
    updateUserStore(userData)
  }

  return {
    user,
    token,
    isAuthenticated,

    login,
    register,
    logout,
    updateUser,
  }
}
