import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import {useFormPersistence} from '../useFormPersistence'

describe('useFormPersistence', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    // Reset localStorage mock
    vi.mocked(localStorage.getItem).mockReturnValue(null)
    vi.mocked(localStorage.setItem).mockReturnValue(undefined)
    vi.mocked(localStorage.removeItem).mockReturnValue(undefined)

    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  describe('Estado inicial', () => {
    it('debe usar defaultValues si no hay datos guardados', () => {
      const defaultValues = {nombre: 'Test', email: 'test@example.com'}

      const {result} = renderHook(() => useFormPersistence('form-key', defaultValues))

      expect(result.current.formData).toEqual(defaultValues)
    })

    it('debe cargar datos guardados en localStorage', () => {
      const savedData = {nombre: 'Guardado', email: 'guardado@example.com'}
      localStorage.setItem(
        'form-key',
        JSON.stringify({
          data: savedData,
          timestamp: Date.now(),
        }),
      )

      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      expect(result.current.formData).toEqual(savedData)
    })

    it('debe usar defaultValues si datos expirados (TTL)', () => {
      const oldData = {nombre: 'Viejo'}
      const defaultValues = {nombre: 'Nuevo'}

      const oldTimestamp = Date.now() - 7200000
      localStorage.setItem(
        'form-key',
        JSON.stringify({
          data: oldData,
          timestamp: oldTimestamp,
        }),
      )

      const {result} = renderHook(() => useFormPersistence('form-key', defaultValues, 3600000))

      expect(result.current.formData).toEqual(defaultValues)
    })

    it('debe manejar localStorage corrupto', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const defaultValues = {nombre: 'Default'}

      localStorage.setItem('form-key', 'invalid-json')

      const {result} = renderHook(() => useFormPersistence('form-key', defaultValues))

      expect(result.current.formData).toEqual(defaultValues)
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error al cargar datos'),
        expect.any(Error),
      )

      consoleSpy.mockRestore()
    })
  })

  describe('saveFormData', () => {
    it('debe guardar datos en el estado', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      const newData = {nombre: 'Juan', email: 'juan@example.com'}

      act(() => {
        result.current.saveFormData(newData)
      })

      expect(result.current.formData).toEqual(newData)
    })

    it('debe persistir datos en localStorage después del debounce', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      const newData = {nombre: 'María'}

      act(() => {
        result.current.saveFormData(newData)
      })

      expect(localStorage.getItem('form-key')).toBe(null)

      act(() => {
        vi.advanceTimersByTime(500)
      })

      const saved = JSON.parse(localStorage.getItem('form-key'))
      expect(saved.data).toEqual(newData)
      expect(saved.timestamp).toBeDefined()
    })

    it('no debe guardar antes del debounce timeout', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      act(() => {
        result.current.saveFormData({nombre: 'Test'})
      })

      act(() => {
        vi.advanceTimersByTime(499)
      })

      expect(localStorage.getItem('form-key')).toBe(null)
    })

    it('debe actualizar timestamp en cada guardado', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      act(() => {
        result.current.saveFormData({nombre: 'First'})
        vi.advanceTimersByTime(500)
      })

      const firstSave = JSON.parse(localStorage.getItem('form-key'))
      const firstTimestamp = firstSave.timestamp

      act(() => {
        result.current.saveFormData({nombre: 'Second'})
        vi.advanceTimersByTime(500)
      })

      const secondSave = JSON.parse(localStorage.getItem('form-key'))
      expect(secondSave.timestamp).toBeGreaterThanOrEqual(firstTimestamp)
    })
  })

  describe('clearFormData', () => {
    it('debe limpiar datos del estado', () => {
      const defaultValues = {nombre: ''}
      const {result} = renderHook(() => useFormPersistence('form-key', defaultValues))

      act(() => {
        result.current.saveFormData({nombre: 'Test'})
      })

      expect(result.current.formData).toEqual({nombre: 'Test'})

      act(() => {
        result.current.clearFormData()
      })

      expect(result.current.formData).toEqual(defaultValues)
    })

    it('debe eliminar datos de localStorage', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      act(() => {
        result.current.saveFormData({nombre: 'Test'})
        vi.advanceTimersByTime(500)
      })

      expect(localStorage.getItem('form-key')).not.toBe(null)

      act(() => {
        result.current.clearFormData()
      })

      expect(localStorage.getItem('form-key')).toBe(null)
    })

    it('debe manejar errores al limpiar', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const mockRemoveItem = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage error')
      })

      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      act(() => {
        result.current.clearFormData()
      })

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Error al limpiar datos'),
        expect.any(Error),
      )

      consoleSpy.mockRestore()
      mockRemoveItem.mockRestore()
    })
  })

  describe('Persistencia automática', () => {
    it('no debe guardar objetos vacíos', () => {
      const {result} = renderHook(() => useFormPersistence('form-key', {}))

      act(() => {
        result.current.saveFormData({})
        vi.advanceTimersByTime(500)
      })

      expect(localStorage.getItem('form-key')).toBe(null)
    })
  })
})
