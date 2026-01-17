import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi} from 'vitest'
import {useUIStore} from '../uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    const {result} = renderHook(() => useUIStore())
    act(() => {
      result.current.setLoading(false)
      // Clear toasts
      result.current.toasts.forEach((toast) => {
        result.current.removeToast(toast.id)
      })
      // Close all modals
      result.current.closeModal('deleteTask')
      result.current.closeModal('deleteAccount')
    })
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const {result} = renderHook(() => useUIStore())

      expect(result.current.isLoading).toBe(false)
      expect(result.current.toasts).toEqual([])
      expect(result.current.modals.deleteTask.isOpen).toBe(false)
      expect(result.current.modals.deleteTask.taskId).toBe(null)
      expect(result.current.modals.deleteAccount.isOpen).toBe(false)
    })
  })

  describe('setLoading', () => {
    it('debe actualizar el estado de loading a true', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.setLoading(true)
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('debe actualizar el estado de loading a false', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.setLoading(true)
      })
      expect(result.current.isLoading).toBe(true)

      act(() => {
        result.current.setLoading(false)
      })
      expect(result.current.isLoading).toBe(false)
    })

    it('debe poder alternar entre true y false múltiples veces', () => {
      const {result} = renderHook(() => useUIStore())

      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.setLoading(true)
        })
        expect(result.current.isLoading).toBe(true)

        act(() => {
          result.current.setLoading(false)
        })
        expect(result.current.isLoading).toBe(false)
      }
    })
  })

  describe('addToast', () => {
    it('debe agregar un toast con valores por defecto', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Test message')
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].message).toBe('Test message')
      expect(result.current.toasts[0].type).toBe('info')
      expect(result.current.toasts[0].duration).toBe(3000)
      expect(result.current.toasts[0].id).toMatch(/^toast-/)
    })

    it('debe agregar un toast con tipo personalizado', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Success message', 'success')
      })

      expect(result.current.toasts[0].type).toBe('success')
    })

    it('debe agregar un toast con duración personalizada', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Long message', 'warning', 5000)
      })

      expect(result.current.toasts[0].duration).toBe(5000)
    })

    it('debe retornar un ID único para cada toast', () => {
      const {result} = renderHook(() => useUIStore())

      let id1, id2

      act(() => {
        id1 = result.current.addToast('Toast 1')
        id2 = result.current.addToast('Toast 2')
      })

      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
    })

    it('debe permitir múltiples toasts simultáneos', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Toast 1', 'info')
        result.current.addToast('Toast 2', 'success')
        result.current.addToast('Toast 3', 'error')
      })

      expect(result.current.toasts).toHaveLength(3)
      expect(result.current.toasts[0].message).toBe('Toast 1')
      expect(result.current.toasts[1].message).toBe('Toast 2')
      expect(result.current.toasts[2].message).toBe('Toast 3')
    })
  })

  describe('removeToast', () => {
    it('debe eliminar un toast por ID', () => {
      const {result} = renderHook(() => useUIStore())

      let toastId

      act(() => {
        toastId = result.current.addToast('Test toast')
      })

      expect(result.current.toasts).toHaveLength(1)

      act(() => {
        result.current.removeToast(toastId)
      })

      expect(result.current.toasts).toHaveLength(0)
    })

    it('debe eliminar el toast correcto de múltiples', () => {
      const {result} = renderHook(() => useUIStore())

      let id1, id2, id3

      act(() => {
        id1 = result.current.addToast('Toast 1')
        id2 = result.current.addToast('Toast 2')
        id3 = result.current.addToast('Toast 3')
      })

      expect(result.current.toasts).toHaveLength(3)

      act(() => {
        result.current.removeToast(id2)
      })

      expect(result.current.toasts).toHaveLength(2)
      expect(result.current.toasts[0].id).toBe(id1)
      expect(result.current.toasts[1].id).toBe(id3)
    })

    it('no debe causar error si el ID no existe', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Toast')
      })

      expect(() => {
        act(() => {
          result.current.removeToast('non-existent-id')
        })
      }).not.toThrow()

      expect(result.current.toasts).toHaveLength(1)
    })
  })

  describe('openModal', () => {
    it('debe abrir el modal deleteTask sin data', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteTask')
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(true)
    })

    it('debe abrir el modal deleteTask con taskId', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteTask', {taskId: 42})
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(true)
      expect(result.current.modals.deleteTask.taskId).toBe(42)
    })

    it('debe abrir el modal deleteAccount', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteAccount')
      })

      expect(result.current.modals.deleteAccount.isOpen).toBe(true)
    })

    it('debe poder abrir múltiples modales', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteTask', {taskId: 1})
        result.current.openModal('deleteAccount')
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(true)
      expect(result.current.modals.deleteAccount.isOpen).toBe(true)
    })
  })

  describe('closeModal', () => {
    it('debe cerrar el modal deleteTask', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteTask', {taskId: 5})
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(true)

      act(() => {
        result.current.closeModal('deleteTask')
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(false)
      expect(result.current.modals.deleteTask.taskId).toBe(null)
    })

    it('debe cerrar el modal deleteAccount', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteAccount')
      })

      expect(result.current.modals.deleteAccount.isOpen).toBe(true)

      act(() => {
        result.current.closeModal('deleteAccount')
      })

      expect(result.current.modals.deleteAccount.isOpen).toBe(false)
    })

    it('debe poder cerrar y reabrir un modal', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.openModal('deleteTask', {taskId: 10})
        result.current.closeModal('deleteTask')
        result.current.openModal('deleteTask', {taskId: 20})
      })

      expect(result.current.modals.deleteTask.isOpen).toBe(true)
      expect(result.current.modals.deleteTask.taskId).toBe(20)
    })
  })

  describe('Estado sin side effects', () => {
    it('setLoading no debe afectar toasts', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.addToast('Test')
        result.current.setLoading(true)
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.isLoading).toBe(true)
    })

    it('addToast no debe afectar isLoading', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.setLoading(true)
        result.current.addToast('Test')
      })

      expect(result.current.isLoading).toBe(true)
    })

    it('openModal no debe afectar otros estados', () => {
      const {result} = renderHook(() => useUIStore())

      act(() => {
        result.current.setLoading(true)
        result.current.addToast('Test')
        result.current.openModal('deleteTask')
      })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.modals.deleteTask.isOpen).toBe(true)
    })
  })
})
