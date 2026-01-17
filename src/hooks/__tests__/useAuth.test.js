import {renderHook, act, waitFor} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi} from 'vitest'
import {useAuth} from '../useAuth'
import {useAuthStore} from '../../stores/authStore'
import * as authService from '../../features/autenticacion/services/authService'
import * as useToastModule from '../useToast'

vi.mock('../../features/autenticacion/services/authService')
vi.mock('../useToast')

describe('useAuth', () => {
  const mockShowSuccess = vi.fn()
  const mockShowError = vi.fn()

  beforeEach(() => {
    const {result} = renderHook(() => useAuthStore())
    act(() => {
      result.current.logout()
    })
    vi.clearAllMocks()

    vi.mocked(useToastModule.useToast).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      showInfo: vi.fn(),
      showWarning: vi.fn(),
      removeToast: vi.fn(),
      toasts: [],
    })
  })

  describe('Estado inicial', () => {
    it('debe exponer el estado de autenticación', () => {
      const {result} = renderHook(() => useAuth())

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.token).toBeDefined()
      expect(result.current.user).toBeDefined()
    })

    it('debe exponer funciones de autenticación', () => {
      const {result} = renderHook(() => useAuth())

      expect(typeof result.current.login).toBe('function')
      expect(typeof result.current.register).toBe('function')
      expect(typeof result.current.logout).toBe('function')
      expect(typeof result.current.updateUser).toBe('function')
    })
  })

  describe('login', () => {
    it('debe realizar login exitosamente', async () => {
      const mockUser = {
        id: 1,
        nombre: 'Test',
        email: 'test@example.com',
      }

      const mockResponse = {
        success: true,
        user: mockUser,
        token: 'mock-token-123',
      }

      vi.mocked(authService.login).mockResolvedValue(mockResponse)

      const {result} = renderHook(() => useAuth())

      let loginResult

      await act(async () => {
        loginResult = await result.current.login('test@example.com', 'password123')
      })

      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123')
      expect(loginResult).toBe(true)
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user.email).toBe('test@example.com')
      expect(mockShowSuccess).toHaveBeenCalledWith('¡Bienvenido de vuelta!')
    })

    it('debe manejar login fallido (success: false)', async () => {
      vi.mocked(authService.login).mockResolvedValue({
        success: false,
      })

      const {result} = renderHook(() => useAuth())

      let loginResult

      await act(async () => {
        loginResult = await result.current.login('wrong@example.com', 'wrongpass')
      })

      expect(loginResult).toBe(false)
      expect(result.current.isAuthenticated).toBe(false)
      expect(mockShowSuccess).not.toHaveBeenCalled()
    })

    it('debe manejar errores del servicio', async () => {
      const errorMessage = 'Credenciales inválidas'
      vi.mocked(authService.login).mockRejectedValue(new Error(errorMessage))

      const {result} = renderHook(() => useAuth())

      let loginResult

      await act(async () => {
        loginResult = await result.current.login('test@example.com', 'wrongpass')
      })

      expect(loginResult).toBe(false)
      expect(result.current.isAuthenticated).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith(errorMessage)
    })

    it('debe manejar errores sin mensaje', async () => {
      vi.mocked(authService.login).mockRejectedValue(new Error())

      const {result} = renderHook(() => useAuth())

      let loginResult

      await act(async () => {
        loginResult = await result.current.login('test@example.com', 'pass')
      })

      expect(loginResult).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith('Error al iniciar sesión')
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
        success: true,
        user: {
          id: 2,
          nombre: 'Juan',
          email: 'juan@example.com',
        },
        token: 'new-token-456',
      }

      vi.mocked(authService.register).mockResolvedValue(mockResponse)

      const {result} = renderHook(() => useAuth())

      let registerResult

      await act(async () => {
        registerResult = await result.current.register(userData)
      })

      expect(authService.register).toHaveBeenCalledWith(userData)
      expect(registerResult).toBe(true)
      expect(result.current.isAuthenticated).toBe(true)
      expect(mockShowSuccess).toHaveBeenCalledWith('¡Cuenta creada exitosamente!')
    })

    it('debe manejar registro fallido', async () => {
      vi.mocked(authService.register).mockResolvedValue({
        success: false,
      })

      const {result} = renderHook(() => useAuth())

      let registerResult

      await act(async () => {
        registerResult = await result.current.register({email: 'test@example.com'})
      })

      expect(registerResult).toBe(false)
      expect(result.current.isAuthenticated).toBe(false)
    })

    it('debe manejar errores de validación', async () => {
      const errorMessage = 'Email ya está registrado'
      vi.mocked(authService.register).mockRejectedValue(new Error(errorMessage))

      const {result} = renderHook(() => useAuth())

      let registerResult

      await act(async () => {
        registerResult = await result.current.register({email: 'existing@example.com'})
      })

      expect(registerResult).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith(errorMessage)
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(authService.register).mockRejectedValue(new Error())

      const {result} = renderHook(() => useAuth())

      let registerResult

      await act(async () => {
        registerResult = await result.current.register({})
      })

      expect(registerResult).toBe(false)
      expect(mockShowError).toHaveBeenCalledWith('Error al registrar usuario')
    })
  })

  describe('logout', () => {
    it('debe cerrar sesión exitosamente', async () => {
      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        user: {id: 1, email: 'test@example.com'},
        token: 'token',
      })

      vi.mocked(authService.logout).mockResolvedValue(undefined)

      const {result} = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('test@example.com', 'pass')
      })

      expect(result.current.isAuthenticated).toBe(true)

      await act(async () => {
        await result.current.logout()
      })

      expect(authService.logout).toHaveBeenCalled()
      expect(result.current.isAuthenticated).toBe(false)
      expect(mockShowSuccess).toHaveBeenCalledWith('Sesión cerrada')
    })

    it('debe cerrar sesión  localmente incluso si el servicio falla', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        user: {id: 1, email: 'test@example.com'},
        token: 'token',
      })

      vi.mocked(authService.logout).mockRejectedValue(new Error('Server error'))

      const {result} = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('test@example.com', 'pass')
      })

      expect(result.current.isAuthenticated).toBe(true)

      await act(async () => {
        await result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith('Error al cerrar sesión:', expect.any(Error))

      consoleSpy.mockRestore()
    })
  })

  describe('updateUser', () => {
    it('debe actualizar datos del usuario', () => {
      vi.mocked(authService.login).mockResolvedValue({
        success: true,
        user: {id: 1, nombre: 'Original', email: 'test@example.com'},
        token: 'token',
      })

      const {result} = renderHook(() => useAuth())

      act(async () => {
        await result.current.login('test@example.com', 'pass')
      })

      act(() => {
        result.current.updateUser({nombre: 'Actualizado'})
      })

      waitFor(() => {
        expect(result.current.user.nombre).toBe('Actualizado')
      })
    })
  })
})
