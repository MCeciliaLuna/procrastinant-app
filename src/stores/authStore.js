import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import * as authService from '../features/autenticacion/services/authService'
import {getErrorMessage} from '../utils/errorMessages'

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: {
          nombre: '',
          apellido: '',
          alias: '',
          email: '',
        },
        isAuthenticated: false,
        isLoading: false,
        error: null,

        loginAsync: async (credentials) => {
          set({isLoading: true, error: null})
          try {
            const result = await authService.login(credentials)

            if (result.success && result.data?.user) {
              set({
                user: result.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              })
              return {success: true, data: result.data}
            } else {
              const errorInfo = getErrorMessage(
                result.message || 'Error al iniciar sesión',
                'auth',
              )
              set({
                isLoading: false,
                error: errorInfo,
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorInfo = getErrorMessage(
              error.response?.data?.message ||
                error.message ||
                'Error de conexión',
              'auth',
            )
            set({
              isLoading: false,
              error: errorInfo,
            })
            return {success: false, message: errorInfo.message}
          }
        },

        registerAsync: async (userData) => {
          set({isLoading: true, error: null})
          try {
            const result = await authService.register(userData)

            if (result.success && result.data?.user) {
              set({
                user: result.data.user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              })
              return {success: true, data: result.data}
            } else {
              set({
                isLoading: false,
                error: result.message || 'Error al registrarse',
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || 'Error de conexión'
            set({
              isLoading: false,
              error: errorMessage,
            })
            return {success: false, message: errorMessage}
          }
        },

        setUser: (user) => set({user, isAuthenticated: true}),

        login: (user) => {
          set({
            user,
            isAuthenticated: true,
          })
        },

        logout: () => {
          set({
            user: {
              nombre: '',
              apellido: '',
              alias: '',
              email: '',
            },
            isAuthenticated: false,
            isLoading: false,
            error: null,
          })
        },

        updateUser: (userData) =>
          set((state) => ({
            user: {
              ...state.user,
              ...userData,
            },
          })),

        clearError: () => set({error: null}),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      },
    ),
    {name: 'AuthStore'},
  ),
)
