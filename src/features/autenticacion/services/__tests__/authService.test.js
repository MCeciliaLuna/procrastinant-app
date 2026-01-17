import {describe, it, expect, beforeEach, vi} from 'vitest'
import * as authService from '../authService'
import apiClient from '../../../../config/axios'
import {API_ENDPOINTS} from '../../../../config/constants'

vi.mock('../../../../config/axios')

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('debe realizar login exitosamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 1,
              email: 'test@example.com',
              nombre: 'Test',
            },
            token: 'mock-token',
          },
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)

      const result = await authService.login('test@example.com', 'password123')

      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.LOGIN, {
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar errores de credenciales inválidas', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Credenciales inválidas',
          },
        },
      }

      vi.mocked(apiClient.post).mockRejectedValue(mockError)

      await expect(authService.login('wrong@example.com', 'wrongpass')).rejects.toThrow(
        'Credenciales inválidas',
      )
    })

    it('debe manejar errores de red', async () => {
      vi.mocked(apiClient.post).mockRejectedValue(new Error('Network error'))

      await expect(authService.login('test@example.com', 'password')).rejects.toThrow(
        'Error al iniciar sesión',
      )
    })

    it('debe manejar respuestas sin mensaje de error', async () => {
      const mockError = {
        response: {
          data: {},
        },
      }

      vi.mocked(apiClient.post).mockRejectedValue(mockError)

      await expect(authService.login('test@example.com', 'password')).rejects.toThrow(
        'Error al iniciar sesión',
      )
    })
  })

  describe('register', () => {
    it('debe registrar usuario exitosamente', async () => {
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        alias: 'juanp',
        email: 'juan@example.com',
        password: 'password123',
      }

      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 2,
              email: 'juan@example.com',
              nombre: 'Juan',
            },
          },
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)

      const result = await authService.register(userData)

      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.REGISTER, userData)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar email ya registrado', async () => {
      const userData = {
        email: 'existing@example.com',
        password: 'password123',
      }

      const mockError = {
        response: {
          data: {
            message: 'El email ya está registrado',
          },
        },
      }

      vi.mocked(apiClient.post).mockRejectedValue(mockError)

      await expect(authService.register(userData)).rejects.toThrow('El email ya está registrado')
    })

    it('debe manejar errores de validación', async () => {
      const userData = {
        email: 'invalid-email',
        password: '123',
      }

      const mockError = {
        response: {
          data: {
            message: 'Datos de registro inválidos',
          },
        },
      }

      vi.mocked(apiClient.post).mockRejectedValue(mockError)

      await expect(authService.register(userData)).rejects.toThrow('Datos de registro inválidos')
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.post).mockRejectedValue(new Error('Server error'))

      await expect(
        authService.register({email: 'test@example.com', password: 'pass'}),
      ).rejects.toThrow('Error al registrar usuario')
    })
  })

  describe('logout', () => {
    it('debe realizar logout exitosamente', async () => {
      vi.mocked(apiClient.post).mockResolvedValue({data: {success: true}})

      await expect(authService.logout()).resolves.not.toThrow()

      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.LOGOUT)
    })

    it('debe manejar errores de logout silenciosamente', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      vi.mocked(apiClient.post).mockRejectedValue(new Error('Network error'))

      await expect(authService.logout()).resolves.not.toThrow()

      expect(consoleSpy).toHaveBeenCalledWith('Error en logout:', expect.any(Error))

      consoleSpy.mockRestore()
    })

    it('no debe lanzar error si el servidor no responde', async () => {
      vi.mocked(apiClient.post).mockRejectedValue({
        message: 'timeout',
      })

      await expect(authService.logout()).resolves.not.toThrow()
    })
  })

  describe('verifyAuth', () => {
    it('debe verificar autenticación exitosamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 1,
              email: 'test@example.com',
            },
          },
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await authService.verifyAuth()

      expect(apiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.VERIFY_AUTH)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar token inválido o expirado', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'Token inválido o expirado',
          },
        },
      }

      vi.mocked(apiClient.get).mockRejectedValue(mockError)

      await expect(authService.verifyAuth()).rejects.toThrow('Token inválido o expirado')
    })

    it('debe manejar ausencia de sesión', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'No hay sesión activa',
          },
        },
      }

      vi.mocked(apiClient.get).mockRejectedValue(mockError)

      await expect(authService.verifyAuth()).rejects.toThrow('No hay sesión activa')
    })

    it('debe manejar errores de red', async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))

      await expect(authService.verifyAuth()).rejects.toThrow('Error al verificar autenticación')
    })

    it('debe manejar errores sin mensaje específico', async () => {
      const mockError = {
        response: {
          data: {},
        },
      }

      vi.mocked(apiClient.get).mockRejectedValue(mockError)

      await expect(authService.verifyAuth()).rejects.toThrow('Error al verificar autenticación')
    })
  })
})
