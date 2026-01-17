import {renderHook, act, waitFor} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi} from 'vitest'
import {useApi} from '../useApi'

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const {result} = renderHook(() => useApi())

      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe(null)
      expect(result.current.isLoading).toBe(false)
    })

    it('debe exponer funciones execute y reset', () => {
      const {result} = renderHook(() => useApi())

      expect(typeof result.current.execute).toBe('function')
      expect(typeof result.current.reset).toBe('function')
    })
  })

  describe('execute', () => {
    it('debe ejecutar función exitosamente', async () => {
      const mockApiFunction = vi.fn().mockResolvedValue({id: 1, data: 'test data'})

      const {result} = renderHook(() => useApi())

      let executeResult

      await act(async () => {
        executeResult = await result.current.execute(mockApiFunction, 'arg1', 'arg2')
      })

      expect(mockApiFunction).toHaveBeenCalledWith('arg1', 'arg2')
      expect(result.current.data).toEqual({id: 1, data: 'test data'})
      expect(executeResult).toEqual({id: 1, data: 'test data'})
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar isLoading correctamente durante la ejecución', async () => {
      const mockApiFunction = vi.fn(
        () => new Promise((resolve) => setTimeout(() => resolve('done'), 100)),
      )

      const {result} = renderHook(() => useApi())

      const executePromise = act(async () => {
        await result.current.execute(mockApiFunction)
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true)
      })

      await executePromise

      expect(result.current.isLoading).toBe(false)
    })

    it('debe limpiar error antes de nueva ejecución', async () => {
      const mockApiFailure = vi.fn().mockRejectedValue(new Error('First error'))
      const mockApiSuccess = vi.fn().mockResolvedValue('success')

      const {result} = renderHook(() => useApi())

      try {
        await act(async () => {
          await result.current.execute(mockApiFailure)
        })
      } catch {
        // Expected error
      }

      expect(result.current.error).toBe('First error')

      await act(async () => {
        await result.current.execute(mockApiSuccess)
      })

      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores con mensaje', async () => {
      const mockApiFunction = vi.fn().mockRejectedValue(new Error('API Error'))

      const {result} = renderHook(() => useApi())

      await expect(
        act(async () => {
          await result.current.execute(mockApiFunction)
        }),
      ).rejects.toThrow('API Error')

      expect(result.current.error).toBe('API Error')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBe(null)
    })

    it('debe manejar errores sin mensaje', async () => {
      const mockApiFunction = vi.fn().mockRejectedValue({})

      const {result} = renderHook(() => useApi())

      try {
        await act(async () => {
          await result.current.execute(mockApiFunction)
        })
      } catch {
        // Expected error
      }

      expect(result.current.error).toBe('Error en la petición')
      expect(result.current.isLoading).toBe(false)
    })

    it('debe propagar el error para manejo externo', async () => {
      const mockError = new Error('Network error')
      const mockApiFunction = vi.fn().mockRejectedValue(mockError)

      const {result} = renderHook(() => useApi())

      await expect(
        act(async () => {
          await result.current.execute(mockApiFunction)
        }),
      ).rejects.toThrow('Network error')
    })

    it('debe ejecutar funciones con múltiples argumentos', async () => {
      const mockApiFunction = vi.fn((a, b, c) => Promise.resolve(a + b + c))

      const {result} = renderHook(() => useApi())

      await act(async () => {
        await result.current.execute(mockApiFunction, 1, 2, 3)
      })

      expect(mockApiFunction).toHaveBeenCalledWith(1, 2, 3)
      expect(result.current.data).toBe(6)
    })

    it('debe ejecutar funciones sin argumentos', async () => {
      const mockApiFunction = vi.fn().mockResolvedValue('no args')

      const {result} = renderHook(() => useApi())

      await act(async () => {
        await result.current.execute(mockApiFunction)
      })

      expect(mockApiFunction).toHaveBeenCalledWith()
      expect(result.current.data).toBe('no args')
    })

    it('debe manejar múltiples ejecuciones secuenciales', async () => {
      const mockFunction1 = vi.fn().mockResolvedValue('result1')
      const mockFunction2 = vi.fn().mockResolvedValue('result2')

      const {result} = renderHook(() => useApi())

      await act(async () => {
        await result.current.execute(mockFunction1)
      })

      expect(result.current.data).toBe('result1')

      await act(async () => {
        await result.current.execute(mockFunction2)
      })

      expect(result.current.data).toBe('result2')
    })
  })

  describe('reset', () => {
    it('debe limpiar todos los estados', async () => {
      const mockApiFunction = vi.fn().mockResolvedValue('test data')

      const {result} = renderHook(() => useApi())

      await act(async () => {
        await result.current.execute(mockApiFunction)
      })

      expect(result.current.data).toBe('test data')

      act(() => {
        result.current.reset()
      })

      expect(result.current.data).toBe(null)
      expect(result.current.error).toBe(null)
      expect(result.current.isLoading).toBe(false)
    })

    it('debe limpiar estados de error', async () => {
      const mockApiFunction = vi.fn().mockRejectedValue(new Error('Error'))

      const {result} = renderHook(() => useApi())

      try {
        await act(async () => {
          await result.current.execute(mockApiFunction)
        })
      } catch {
        // Expected error
      }

      expect(result.current.error).toBeTruthy()

      act(() => {
        result.current.reset()
      })

      expect(result.current.error).toBe(null)
      expect(result.current.data).toBe(null)
      expect(result.current.isLoading).toBe(false)
    })

    it('debe permitir nueva ejecución después de reset', async () => {
      const mockFunction1 = vi.fn().mockResolvedValue('data1')
      const mockFunction2 = vi.fn().mockResolvedValue('data2')

      const {result} = renderHook(() => useApi())

      await act(async () => {
        await result.current.execute(mockFunction1)
      })

      expect(result.current.data).toBe('data1')

      act(() => {
        result.current.reset()
      })

      await act(async () => {
        await result.current.execute(mockFunction2)
      })

      expect(result.current.data).toBe('data2')
    })
  })
})
