import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest'
import {useToast} from '../useToast'
import {useUIStore} from '../../stores/uiStore'
import {TOAST_DURATION, TOAST_TYPES} from '../../config/constants'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    const {result} = renderHook(() => useUIStore())
    act(() => {
      result.current.toasts.forEach((toast) => {
        result.current.removeToast(toast.id)
      })
    })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('debe exponer funciones de toast', () => {
      const {result} = renderHook(() => useToast())

      expect(typeof result.current.showToast).toBe('function')
      expect(typeof result.current.showSuccess).toBe('function')
      expect(typeof result.current.showError).toBe('function')
      expect(typeof result.current.showInfo).toBe('function')
      expect(typeof result.current.showWarning).toBe('function')
      expect(typeof result.current.removeToast).toBe('function')
    })

    it('debe exponer array de toasts', () => {
      const {result} = renderHook(() => useToast())

      expect(Array.isArray(result.current.toasts)).toBe(true)
    })
  })

  describe('showToast', () => {
    it('debe agregar toast con tipo INFO por defecto', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showToast('Test message')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('Test message')
      expect(uiStore.toasts[0].type).toBe(TOAST_TYPES.INFO)
    })

    it('debe usar duración por defecto', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showToast('Test message')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts[0].duration).toBe(TOAST_DURATION)
    })

    it('debe usar duración personalizada', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showToast('Test', TOAST_TYPES.INFO, 5000)
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts[0].duration).toBe(5000)
    })

    it('debe eliminar toast automáticamente después de duración', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showToast('Test', TOAST_TYPES.INFO, 3000)
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)

      act(() => {
        vi.advanceTimersByTime(3000)
      })

      const uiStoreAfter = useUIStore.getState()
      expect(uiStoreAfter.toasts).toHaveLength(0)
    })

    it('no debe eliminar toast antes de la duración', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showToast('Test', TOAST_TYPES.INFO, 3000)
      })

      act(() => {
        vi.advanceTimersByTime(2999)
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
    })
  })

  describe('showSuccess', () => {
    it('debe mostrar toast de éxito con tipo SUCCESS', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showSuccess('¡Operación exitosa!')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('¡Operación exitosa!')
      expect(uiStore.toasts[0].type).toBe(TOAST_TYPES.SUCCESS)
    })

    it('debe aceptar duración personalizada', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showSuccess('Success', 5000)
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts[0].duration).toBe(5000)
    })
  })

  describe('showError', () => {
    it('debe mostrar toast de error con tipo ERROR', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showError('Error en la operación')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('Error en la operación')
      expect(uiStore.toasts[0].type).toBe(TOAST_TYPES.ERROR)
    })

    it('debe aceptar duración personalizada', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showError('Error', 4000)
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts[0].duration).toBe(4000)
    })
  })

  describe('showInfo', () => {
    it('debe mostrar toast de información con tipo INFO', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showInfo('Información importante')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('Información importante')
      expect(uiStore.toasts[0].type).toBe(TOAST_TYPES.INFO)
    })
  })

  describe('showWarning', () => {
    it('debe mostrar toast de advertencia con tipo WARNING', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showWarning('Advertencia')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('Advertencia')
      expect(uiStore.toasts[0].type).toBe(TOAST_TYPES.WARNING)
    })
  })

  describe('removeToast', () => {
    it('debe eliminar toast manualmente', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showSuccess('Test')
      })

      const uiStoreBefore = useUIStore.getState()
      const toastId = uiStoreBefore.toasts[0].id
      expect(uiStoreBefore.toasts).toHaveLength(1)

      act(() => {
        result.current.removeToast(toastId)
      })

      const uiStoreAfter = useUIStore.getState()
      expect(uiStoreAfter.toasts).toHaveLength(0)
    })
  })

  describe('Múltiples toasts', () => {
    it('debe permitir múltiples toasts simultáneos', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showSuccess('Toast 1')
        result.current.showError('Toast 2')
        result.current.showInfo('Toast 3')
      })

      const uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(3)
    })

    it('debe eliminar cada toast según su propia duración', () => {
      const {result} = renderHook(() => useToast())

      act(() => {
        result.current.showSuccess('Toast corto', 1000)
        result.current.showError('Toast largo', 3000)
      })

      let uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(2)

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(1)
      expect(uiStore.toasts[0].message).toBe('Toast largo')

      act(() => {
        vi.advanceTimersByTime(2000)
      })

      uiStore = useUIStore.getState()
      expect(uiStore.toasts).toHaveLength(0)
    })
  })
})
