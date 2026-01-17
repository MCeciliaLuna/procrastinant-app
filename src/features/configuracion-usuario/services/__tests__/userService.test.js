import {describe, it, expect, beforeEach, vi} from 'vitest'
import * as userService from '../userService'
import apiClient from '../../../../config/axios'
import {API_ENDPOINTS} from '../../../../config/constants'

vi.mock('../../../../config/axios')

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProfile', () => {
    it('debe obtener el perfil del usuario exitosamente', async () => {
      const mockUser = {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        alias: 'juanp',
        email: 'juan@example.com',
      }

      const mockResponse = {
        data: {
          success: true,
          data: {user: mockUser},
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await userService.getProfile()

      expect(apiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.GET_PROFILE)
      expect(result).toEqual(mockUser)
    })

    it('debe retornar null si success es false', async () => {
      const mockResponse = {
        data: {
          success: false,
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await userService.getProfile()

      expect(result).toBe(null)
    })

    it('debe retornar null si no hay datos de usuario', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {},
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await userService.getProfile()

      expect(result).toBe(null)
    })

    it('debe manejar sesión no autenticada', async () => {
      const mockError = {
        response: {
          status: 401,
          data: {
            message: 'No autenticado',
          },
        },
      }

      vi.mocked(apiClient.get).mockRejectedValue(mockError)

      await expect(userService.getProfile()).rejects.toThrow('No autenticado')
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))

      await expect(userService.getProfile()).rejects.toThrow('Error al obtener perfil')
    })
  })

  describe('updateProfile', () => {
    it('debe actualizar el perfil exitosamente', async () => {
      const userData = {
        nombre: 'María',
        apellido: 'González',
        alias: 'mariag',
      }

      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: 1,
              ...userData,
            },
          },
        },
      }

      vi.mocked(apiClient.put).mockResolvedValue(mockResponse)

      const result = await userService.updateProfile(userData)

      expect(apiClient.put).toHaveBeenCalledWith(API_ENDPOINTS.UPDATE_PROFILE, userData)
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar validación de datos inválidos', async () => {
      const invalidData = {
        nombre: '',
        email: 'invalid-email',
      }

      const mockError = {
        response: {
          data: {
            message: 'Datos inválidos',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(userService.updateProfile(invalidData)).rejects.toThrow('Datos inválidos')
    })

    it('debe manejar alias ya existente', async () => {
      const mockError = {
        response: {
          data: {
            message: 'El alias ya está en uso',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(userService.updateProfile({alias: 'existing'})).rejects.toThrow(
        'El alias ya está en uso',
      )
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.put).mockRejectedValue(new Error('Server error'))

      await expect(userService.updateProfile({nombre: 'Test'})).rejects.toThrow(
        'Error al actualizar perfil',
      )
    })
  })

  describe('changePassword', () => {
    it('debe cambiar la contraseña exitosamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Contraseña actualizada',
        },
      }

      vi.mocked(apiClient.put).mockResolvedValue(mockResponse)

      const result = await userService.changePassword('oldpass123', 'newpass123', 'newpass123')

      expect(apiClient.put).toHaveBeenCalledWith(API_ENDPOINTS.CHANGE_PASSWORD, {
        currentPassword: 'oldpass123',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123',
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar contraseña actual incorrecta', async () => {
      const mockError = {
        response: {
          data: {
            message: 'La contraseña actual es incorrecta',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(
        userService.changePassword('wrongpass', 'newpass123', 'newpass123'),
      ).rejects.toThrow('La contraseña actual es incorrecta')
    })

    it('debe manejar contraseñas nuevas que no coinciden', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Las contraseñas no coinciden',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(userService.changePassword('oldpass', 'newpass1', 'newpass2')).rejects.toThrow(
        'Las contraseñas no coinciden',
      )
    })

    it('debe manejar contraseña débil', async () => {
      const mockError = {
        response: {
          data: {
            message: 'La contraseña debe tener al menos 8 caracteres',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(userService.changePassword('oldpass', '123', '123')).rejects.toThrow(
        'La contraseña debe tener al menos 8 caracteres',
      )
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.put).mockRejectedValue(new Error('Network error'))

      await expect(userService.changePassword('old', 'new', 'new')).rejects.toThrow(
        'Error al cambiar contraseña',
      )
    })
  })

  describe('deleteAccount', () => {
    it('debe eliminar la cuenta exitosamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Cuenta eliminada correctamente',
        },
      }

      vi.mocked(apiClient.delete).mockResolvedValue(mockResponse)

      const result = await userService.deleteAccount('password123')

      expect(apiClient.delete).toHaveBeenCalledWith(API_ENDPOINTS.DELETE_ACCOUNT, {
        data: {
          password: 'password123',
          confirmacion: 'ELIMINAR',
        },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('debe manejar contraseña incorrecta', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Contraseña incorrecta',
          },
        },
      }

      vi.mocked(apiClient.delete).mockRejectedValue(mockError)

      await expect(userService.deleteAccount('wrongpassword')).rejects.toThrow(
        'Contraseña incorrecta',
      )
    })

    it('debe manejar errores de autorización', async () => {
      const mockError = {
        response: {
          status: 403,
          data: {
            message: 'No autorizado',
          },
        },
      }

      vi.mocked(apiClient.delete).mockRejectedValue(mockError)

      await expect(userService.deleteAccount('password')).rejects.toThrow('No autorizado')
    })

    it('debe manejar errores de servidor', async () => {
      const mockError = {
        response: {
          status: 500,
          data: {
            message: 'Error del servidor',
          },
        },
      }

      vi.mocked(apiClient.delete).mockRejectedValue(mockError)

      await expect(userService.deleteAccount('password')).rejects.toThrow('Error del servidor')
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.delete).mockRejectedValue(new Error('Network error'))

      await expect(userService.deleteAccount('password')).rejects.toThrow(
        'Error al eliminar cuenta',
      )
    })

    it('debe enviar confirmación ELIMINAR correctamente', async () => {
      const mockResponse = {
        data: {success: true},
      }

      vi.mocked(apiClient.delete).mockResolvedValue(mockResponse)

      await userService.deleteAccount('testpass')

      const callArgs = vi.mocked(apiClient.delete).mock.calls[0]
      expect(callArgs[1].data.confirmacion).toBe('ELIMINAR')
    })
  })
})
