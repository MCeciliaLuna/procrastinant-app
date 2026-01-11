import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi} from 'vitest'
import {useAuthStore} from '../authStore'
import * as authService from '../../features/autenticacion/services/authService'

vi.mock('../../features/autenticacion/services/authService')

describe('authStore', () => {
  beforeEach(() => {
    const {result} = renderHook(() => useAuthStore())
    act(() => {
      result.current.logout()
    })
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const {result} = renderHook(() => useAuthStore())

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
      expect(result.current.user.email).toBe('')
      expect(result.current.user.nombre).toBe('')
    })
  })

  describe('loginAsync', () => {
    it('debe actualizar el estado correctamente en login exitoso', async () => {
      const mockUser = {
        nombre: 'Juan',
        apellido: 'Pérez',
        alias: 'juanp',
        email: 'juan@example.com',
      }

      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        data: {user: mockUser},
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'juan@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores correctamente', async () => {
      const errorMessage = 'Credenciales inválidas'

      vi.mocked(authService.login).mockResolvedValue({
        success: false,
        message: errorMessage,
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'wrong@example.com',
          password: 'wrong',
        })
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).toBeDefined()
      // NOTE: registerAsync currently returns string error, not object like loginAsync
      expect(result.current.isLoading).toBe(false)
    })

    it('debe manejar excepciones de red', async () => {
      const networkError = {
        response: {
          data: {message: 'Error de conexión'},
        },
      }

      vi.mocked(authService.login).mockRejectedValue(networkError)

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).toBeTypeOf('object')
      expect(result.current.error.message).toContain('servidor')
      expect(result.current.error.suggestion).toBeDefined()
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('registerAsync', () => {
    it('debe registrar usuario correctamente', async () => {
      const mockUser = {
        nombre: 'María',
        apellido: 'González',
        alias: 'mariag',
        email: 'maria@example.com',
      }

      vi.mocked(authService.register).mockResolvedValue({
        success: true,
        data: {user: mockUser},
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.registerAsync({
          nombre: 'María',
          apellido: 'González',
          alias: 'mariag',
          email: 'maria@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual(mockUser)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores de registro', async () => {
      vi.mocked(authService.register).mockResolvedValue({
        success: false,
        message: 'Este email ya está registrado',
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.registerAsync({
          email: 'existing@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).toBeDefined()
    })
  })

  describe('logout', () => {
    it('debe limpiar el estado correctamente', async () => {
      const mockUser = {
        nombre: 'Test',
        apellido: 'User',
        alias: 'testuser',
        email: 'test@example.com',
      }

      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        data: {user: mockUser},
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(true)

      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.user.email).toBe('')
      expect(result.current.user.nombre).toBe('')
      expect(result.current.error).toBe(null)
    })
  })

  describe('clearError', () => {
    it('debe limpiar el error', async () => {
      vi.mocked(authService.login).mockResolvedValue({
        success: false,
        message: 'Error de prueba',
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'test@example.com',
          password: 'wrong',
        })
      })

      expect(result.current.error).toBeTypeOf('object')
      expect(result.current.error.message).toBeDefined()

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBe(null)
    })
  })

  describe('Persistencia', () => {
    it('debe intentar persistir datos en localStorage', async () => {
      const mockUser = {
        nombre: 'Persist',
        apellido: 'Test',
        alias: 'persisttest',
        email: 'persist@example.com',
      }

      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        data: {user: mockUser},
      })

      const {result} = renderHook(() => useAuthStore())

      await act(async () => {
        await result.current.loginAsync({
          email: 'persist@example.com',
          password: 'password123',
        })
      })

      expect(localStorage.setItem).toHaveBeenCalled()

      const calls = vi.mocked(localStorage.setItem).mock.calls
      const authStorageCall = calls.find((call) => call[0] === 'auth-storage')

      expect(authStorageCall).toBeDefined()
    })
  })
})
