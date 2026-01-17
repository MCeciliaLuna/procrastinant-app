import {renderHook, act} from '@testing-library/react'
import {describe, it, expect, beforeEach, vi} from 'vitest'
import {useTareasStore} from '../tareasStore'
import * as tareasService from '../../features/dashboard/services/tareasService'

vi.mock('../../features/dashboard/services/tareasService')

describe('tareasStore', () => {
  beforeEach(() => {
    const {result} = renderHook(() => useTareasStore())
    act(() => {
      result.current.setTareas([])
      result.current.setSearchQuery('')
      result.current.clearError()
    })
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const {result} = renderHook(() => useTareasStore())

      expect(result.current.tareas).toEqual([])
      expect(result.current.searchQuery).toBe('')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })
  })

  describe('setTareas', () => {
    it('debe actualizar el array de tareas', () => {
      const {result} = renderHook(() => useTareasStore())
      const mockTareas = [
        {id: 1, descripcion: 'Tarea 1', completada: false},
        {id: 2, descripcion: 'Tarea 2', completada: true},
      ]

      act(() => {
        result.current.setTareas(mockTareas)
      })

      expect(result.current.tareas).toEqual(mockTareas)
      expect(result.current.tareas).toHaveLength(2)
    })

    it('debe manejar arrays vacíos', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Test'}])
      })

      expect(result.current.tareas).toHaveLength(1)

      act(() => {
        result.current.setTareas([])
      })

      expect(result.current.tareas).toEqual([])
      expect(result.current.tareas).toHaveLength(0)
    })
  })

  describe('addTarea', () => {
    it('debe agregar una tarea al array', () => {
      const {result} = renderHook(() => useTareasStore())
      const nuevaTarea = {id: 1, descripcion: 'Nueva tarea', completada: false}

      act(() => {
        result.current.addTarea(nuevaTarea)
      })

      expect(result.current.tareas).toHaveLength(1)
      expect(result.current.tareas[0]).toEqual(nuevaTarea)
    })

    it('debe agregar múltiples tareas manteniendo el orden', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.addTarea({id: 1, descripcion: 'Primera'})
        result.current.addTarea({id: 2, descripcion: 'Segunda'})
        result.current.addTarea({id: 3, descripcion: 'Tercera'})
      })

      expect(result.current.tareas).toHaveLength(3)
      expect(result.current.tareas[0].descripcion).toBe('Primera')
      expect(result.current.tareas[2].descripcion).toBe('Tercera')
    })
  })

  describe('updateTarea', () => {
    it('debe actualizar una tarea existente', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Tarea 1', completada: false},
          {id: 2, descripcion: 'Tarea 2', completada: false},
        ])
      })

      act(() => {
        result.current.updateTarea(1, {completada: true})
      })

      expect(result.current.tareas[0].completada).toBe(true)
      expect(result.current.tareas[1].completada).toBe(false)
    })

    it('debe mantener otras propiedades al actualizar', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Original', completada: false, prioridad: 'alta'},
        ])
      })

      act(() => {
        result.current.updateTarea(1, {descripcion: 'Actualizada'})
      })

      expect(result.current.tareas[0].descripcion).toBe('Actualizada')
      expect(result.current.tareas[0].completada).toBe(false)
      expect(result.current.tareas[0].prioridad).toBe('alta')
    })

    it('no debe modificar otras tareas', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Tarea 1'},
          {id: 2, descripcion: 'Tarea 2'},
          {id: 3, descripcion: 'Tarea 3'},
        ])
      })

      act(() => {
        result.current.updateTarea(2, {descripcion: 'Modificada'})
      })

      expect(result.current.tareas[0].descripcion).toBe('Tarea 1')
      expect(result.current.tareas[1].descripcion).toBe('Modificada')
      expect(result.current.tareas[2].descripcion).toBe('Tarea 3')
    })
  })

  describe('deleteTarea', () => {
    it('debe eliminar una tarea por ID', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Tarea 1'},
          {id: 2, descripcion: 'Tarea 2'},
          {id: 3, descripcion: 'Tarea 3'},
        ])
      })

      act(() => {
        result.current.deleteTarea(2)
      })

      expect(result.current.tareas).toHaveLength(2)
      expect(result.current.tareas.find((t) => t.id === 2)).toBeUndefined()
      expect(result.current.tareas[0].id).toBe(1)
      expect(result.current.tareas[1].id).toBe(3)
    })

    it('no debe modificar el array si el ID no existe', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Tarea 1'}])
      })

      act(() => {
        result.current.deleteTarea(999)
      })

      expect(result.current.tareas).toHaveLength(1)
    })
  })

  describe('setSearchQuery', () => {
    it('debe actualizar el query de búsqueda', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setSearchQuery('test query')
      })

      expect(result.current.searchQuery).toBe('test query')
    })

    it('debe limpiar el query con string vacío', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setSearchQuery('búsqueda')
      })
      expect(result.current.searchQuery).toBe('búsqueda')

      act(() => {
        result.current.setSearchQuery('')
      })
      expect(result.current.searchQuery).toBe('')
    })
  })

  describe('getFilteredTareas', () => {
    beforeEach(() => {
      const {result} = renderHook(() => useTareasStore())
      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Comprar leche'},
          {id: 2, descripcion: 'Estudiar JavaScript'},
          {id: 3, descripcion: 'Hacer ejercicio'},
          {id: 4, descripcion: 'Leer libro de JavaScript'},
        ])
      })
    })

    it('debe retornar todas las tareas si no hay query', () => {
      const {result} = renderHook(() => useTareasStore())

      const filtered = result.current.getFilteredTareas()

      expect(filtered).toHaveLength(4)
    })

    it('debe filtrar tareas por descripción (case insensitive)', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setSearchQuery('javascript')
      })

      const filtered = result.current.getFilteredTareas()

      expect(filtered).toHaveLength(2)
      expect(filtered[0].id).toBe(2)
      expect(filtered[1].id).toBe(4)
    })

    it('debe retornar array vacío si no hay coincidencias', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setSearchQuery('xyz123')
      })

      const filtered = result.current.getFilteredTareas()

      expect(filtered).toHaveLength(0)
    })

    it('debe manejar búsquedas parciales', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setSearchQuery('comp')
      })

      const filtered = result.current.getFilteredTareas()

      expect(filtered).toHaveLength(1)
      expect(filtered[0].descripcion).toBe('Comprar leche')
    })
  })

  describe('fetchTareasAsync', () => {
    it('debe obtener tareas exitosamente', async () => {
      const mockTareas = [
        {id: 1, descripcion: 'Tarea 1'},
        {id: 2, descripcion: 'Tarea 2'},
      ]

      vi.mocked(tareasService.getTareas).mockResolvedValue({
        success: true,
        data: mockTareas,
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.fetchTareasAsync()
      })

      expect(result.current.tareas).toEqual(mockTareas)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores de servicio', async () => {
      vi.mocked(tareasService.getTareas).mockResolvedValue({
        success: false,
        message: 'Error al obtener tareas',
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.fetchTareasAsync()
      })

      expect(result.current.tareas).toEqual([])
      expect(result.current.error).toBe('Error al obtener tareas')
      expect(result.current.isLoading).toBe(false)
    })

    it('debe manejar excepciones de red', async () => {
      vi.mocked(tareasService.getTareas).mockRejectedValue({
        response: {data: {message: 'Error de conexión'}},
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.fetchTareasAsync()
      })

      expect(result.current.error).toBe('Error de conexión')
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('createTareaAsync', () => {
    it('debe crear una tarea exitosamente', async () => {
      const nuevaTarea = {id: 5, descripcion: 'Nueva tarea', completada: false}

      vi.mocked(tareasService.createTarea).mockResolvedValue({
        success: true,
        data: nuevaTarea,
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.createTareaAsync({descripcion: 'Nueva tarea'})
      })

      expect(result.current.tareas).toHaveLength(1)
      expect(result.current.tareas[0]).toEqual(nuevaTarea)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores al crear', async () => {
      vi.mocked(tareasService.createTarea).mockResolvedValue({
        success: false,
        message: 'Error al crear tarea',
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.createTareaAsync({descripcion: 'Test'})
      })

      expect(result.current.tareas).toHaveLength(0)
      expect(result.current.error).toBe('Error al crear tarea')
    })
  })

  describe('updateTareaAsync', () => {
    it('debe actualizar una tarea exitosamente', async () => {
      vi.mocked(tareasService.updateTarea).mockResolvedValue({
        success: true,
      })

      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Original', completada: false}])
      })

      await act(async () => {
        await result.current.updateTareaAsync(1, {completada: true})
      })

      expect(result.current.tareas[0].completada).toBe(true)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores al actualizar', async () => {
      vi.mocked(tareasService.updateTarea).mockResolvedValue({
        success: false,
        message: 'Error al actualizar',
      })

      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Tarea'}])
      })

      await act(async () => {
        await result.current.updateTareaAsync(1, {descripcion: 'Nuevo'})
      })

      expect(result.current.error).toBe('Error al actualizar')
    })
  })

  describe('deleteTareaAsync', () => {
    it('debe eliminar una tarea exitosamente', async () => {
      vi.mocked(tareasService.deleteTarea).mockResolvedValue({
        success: true,
      })

      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([
          {id: 1, descripcion: 'Tarea 1'},
          {id: 2, descripcion: 'Tarea 2'},
        ])
      })

      await act(async () => {
        await result.current.deleteTareaAsync(1)
      })

      expect(result.current.tareas).toHaveLength(1)
      expect(result.current.tareas[0].id).toBe(2)
      expect(result.current.error).toBe(null)
    })

    it('debe manejar errores al eliminar', async () => {
      vi.mocked(tareasService.deleteTarea).mockResolvedValue({
        success: false,
        message: 'Error al eliminar',
      })

      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Tarea'}])
      })

      await act(async () => {
        await result.current.deleteTareaAsync(1)
      })

      expect(result.current.tareas).toHaveLength(1)
      expect(result.current.error).toBe('Error al eliminar')
    })
  })

  describe('clearError', () => {
    it('debe limpiar el error', async () => {
      vi.mocked(tareasService.getTareas).mockResolvedValue({
        success: false,
        message: 'Error de prueba',
      })

      const {result} = renderHook(() => useTareasStore())

      await act(async () => {
        await result.current.fetchTareasAsync()
      })

      expect(result.current.error).toBe('Error de prueba')

      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBe(null)
    })
  })

  describe('Persistencia', () => {
    it('debe persistir datos en localStorage', () => {
      const {result} = renderHook(() => useTareasStore())

      act(() => {
        result.current.setTareas([{id: 1, descripcion: 'Persistida'}])
      })

      expect(localStorage.setItem).toHaveBeenCalled()

      const calls = vi.mocked(localStorage.setItem).mock.calls
      const tareasStorageCall = calls.find((call) => call[0] === 'tareas-storage')

      expect(tareasStorageCall).toBeDefined()
    })
  })
})
