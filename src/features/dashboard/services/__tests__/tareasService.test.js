import {describe, it, expect, beforeEach, vi} from 'vitest'
import * as tareasService from '../tareasService'
import apiClient from '../../../../config/axios'
import {API_ENDPOINTS} from '../../../../config/constants'
import * as tareaMapper from '../../../../services/mappers/tareaMapper'

vi.mock('../../../../config/axios')
vi.mock('../../../../services/mappers/tareaMapper')

describe('tareasService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getTareas', () => {
    it('debe obtener tareas exitosamente', async () => {
      const mockBackendTareas = [
        {id: 1, descripcion: 'Tarea 1', listo: false},
        {id: 2, descripcion: 'Tarea 2', listo: true},
      ]

      const mockFrontendTareas = [
        {id: 1, descripcion: 'Tarea 1', completada: false},
        {id: 2, descripcion: 'Tarea 2', completada: true},
      ]

      const mockResponse = {
        data: {
          success: true,
          data: {tareas: mockBackendTareas},
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendArrayToFrontend).mockReturnValue(mockFrontendTareas)

      const result = await tareasService.getTareas()

      expect(apiClient.get).toHaveBeenCalledWith(`${API_ENDPOINTS.GET_TAREAS}?`)
      expect(tareaMapper.backendArrayToFrontend).toHaveBeenCalledWith(mockBackendTareas)
      expect(result).toEqual(mockFrontendTareas)
    })

    it('debe aplicar filtros en los parámetros', async () => {
      const filters = {completada: 'true', limit: '10'}

      const mockResponse = {
        data: {
          success: true,
          data: {tareas: []},
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendArrayToFrontend).mockReturnValue([])

      await tareasService.getTareas(filters)

      expect(apiClient.get).toHaveBeenCalledWith(
        `${API_ENDPOINTS.GET_TAREAS}?completada=true&limit=10`,
      )
    })

    it('debe retornar array vacío si no hay tareas', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {tareas: []},
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendArrayToFrontend).mockReturnValue([])

      const result = await tareasService.getTareas()

      expect(result).toEqual([])
    })

    it('debe retornar array vacío si success es false', async () => {
      const mockResponse = {
        data: {
          success: false,
        },
      }

      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      const result = await tareasService.getTareas()

      expect(result).toEqual([])
    })

    it('debe manejar errores de red', async () => {
      vi.mocked(apiClient.get).mockRejectedValue(new Error('Network error'))

      await expect(tareasService.getTareas()).rejects.toThrow('Error al obtener tareas')
    })

    it('debe manejar errores del servidor', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error interno del servidor',
          },
        },
      }

      vi.mocked(apiClient.get).mockRejectedValue(mockError)

      await expect(tareasService.getTareas()).rejects.toThrow('Error interno del servidor')
    })
  })

  describe('createTarea', () => {
    it('debe crear una tarea exitosamente', async () => {
      const mockBackendTarea = {id: 5, descripcion: 'Nueva tarea', listo: false}
      const mockFrontendTarea = {id: 5, descripcion: 'Nueva tarea', completada: false}

      const mockResponse = {
        data: {
          success: true,
          data: {tarea: mockBackendTarea},
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue(mockFrontendTarea)

      const result = await tareasService.createTarea('Nueva tarea')

      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CREATE_TAREA, {
        descripcion: 'Nueva tarea',
        numeroOrden: 0,
        listo: false,
      })
      expect(tareaMapper.backendToFrontend).toHaveBeenCalledWith(mockBackendTarea)
      expect(result).toEqual(mockFrontendTarea)
    })

    it('debe crear tarea con numeroOrden personalizado', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {tarea: {id: 6, descripcion: 'Test'}},
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue({id: 6})

      await tareasService.createTarea('Test', 5)

      expect(apiClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CREATE_TAREA, {
        descripcion: 'Test',
        numeroOrden: 5,
        listo: false,
      })
    })

    it('debe retornar null si success es false', async () => {
      const mockResponse = {
        data: {
          success: false,
        },
      }

      vi.mocked(apiClient.post).mockResolvedValue(mockResponse)

      const result = await tareasService.createTarea('Test')

      expect(result).toBe(null)
    })

    it('debe manejar errores de validación', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Descripción requerida',
          },
        },
      }

      vi.mocked(apiClient.post).mockRejectedValue(mockError)

      await expect(tareasService.createTarea('')).rejects.toThrow('Descripción requerida')
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.post).mockRejectedValue(new Error('Server error'))

      await expect(tareasService.createTarea('Test')).rejects.toThrow('Error al crear tarea')
    })
  })

  describe('updateTarea', () => {
    it('debe actualizar una tarea exitosamente', async () => {
      const updates = {descripcion: 'Tarea actualizada', listo: true}
      const mockBackendTarea = {id: 1, ...updates}
      const mockFrontendTarea = {id: 1, descripcion: 'Tarea actualizada', completada: true}

      const mockResponse = {
        data: {
          success: true,
          data: {tarea: mockBackendTarea},
        },
      }

      vi.mocked(apiClient.put).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue(mockFrontendTarea)

      const result = await tareasService.updateTarea(1, updates)

      expect(apiClient.put).toHaveBeenCalledWith(API_ENDPOINTS.UPDATE_TAREA(1), updates)
      expect(tareaMapper.backendToFrontend).toHaveBeenCalledWith(mockBackendTarea)
      expect(result).toEqual(mockFrontendTarea)
    })

    it('debe retornar null si success es false', async () => {
      const mockResponse = {
        data: {
          success: false,
        },
      }

      vi.mocked(apiClient.put).mockResolvedValue(mockResponse)

      const result = await tareasService.updateTarea(1, {descripcion: 'Test'})

      expect(result).toBe(null)
    })

    it('debe manejar tarea no encontrada', async () => {
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Tarea no encontrada',
          },
        },
      }

      vi.mocked(apiClient.put).mockRejectedValue(mockError)

      await expect(tareasService.updateTarea(999, {descripcion: 'Test'})).rejects.toThrow(
        'Tarea no encontrada',
      )
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.put).mockRejectedValue(new Error('Error'))

      await expect(tareasService.updateTarea(1, {})).rejects.toThrow('Error al actualizar tarea')
    })
  })

  describe('toggleTarea', () => {
    it('debe cambiar estado de tarea sin parámetro listo', async () => {
      const mockBackendTarea = {id: 1, listo: true}
      const mockFrontendTarea = {id: 1, completada: true}

      const mockResponse = {
        data: {
          success: true,
          data: {tarea: mockBackendTarea},
        },
      }

      vi.mocked(apiClient.patch).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue(mockFrontendTarea)

      const result = await tareasService.toggleTarea(1)

      expect(apiClient.patch).toHaveBeenCalledWith(API_ENDPOINTS.TOGGLE_TAREA(1), {})
      expect(result).toEqual(mockFrontendTarea)
    })

    it('debe cambiar estado con listo=true explícito', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {tarea: {id: 1, listo: true}},
        },
      }

      vi.mocked(apiClient.patch).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue({id: 1, completada: true})

      await tareasService.toggleTarea(1, true)

      expect(apiClient.patch).toHaveBeenCalledWith(API_ENDPOINTS.TOGGLE_TAREA(1), {listo: true})
    })

    it('debe cambiar estado con listo=false explícito', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {tarea: {id: 1, listo: false}},
        },
      }

      vi.mocked(apiClient.patch).mockResolvedValue(mockResponse)
      vi.mocked(tareaMapper.backendToFrontend).mockReturnValue({id: 1, completada: false})

      await tareasService.toggleTarea(1, false)

      expect(apiClient.patch).toHaveBeenCalledWith(API_ENDPOINTS.TOGGLE_TAREA(1), {listo: false})
    })

    it('debe retornar null si success es false', async () => {
      const mockResponse = {
        data: {
          success: false,
        },
      }

      vi.mocked(apiClient.patch).mockResolvedValue(mockResponse)

      const result = await tareasService.toggleTarea(1)

      expect(result).toBe(null)
    })

    it('debe manejar errores', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error al cambiar estado',
          },
        },
      }

      vi.mocked(apiClient.patch).mockRejectedValue(mockError)

      await expect(tareasService.toggleTarea(1)).rejects.toThrow('Error al cambiar estado')
    })
  })

  describe('deleteTarea', () => {
    it('debe eliminar una tarea exitosamente', async () => {
      vi.mocked(apiClient.delete).mockResolvedValue({data: {success: true}})

      await expect(tareasService.deleteTarea(1)).resolves.not.toThrow()

      expect(apiClient.delete).toHaveBeenCalledWith(API_ENDPOINTS.DELETE_TAREA(1))
    })

    it('debe manejar tarea no encontrada', async () => {
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Tarea no encontrada',
          },
        },
      }

      vi.mocked(apiClient.delete).mockRejectedValue(mockError)

      await expect(tareasService.deleteTarea(999)).rejects.toThrow('Tarea no encontrada')
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

      await expect(tareasService.deleteTarea(1)).rejects.toThrow('No autorizado')
    })

    it('debe manejar errores genéricos', async () => {
      vi.mocked(apiClient.delete).mockRejectedValue(new Error('Server error'))

      await expect(tareasService.deleteTarea(1)).rejects.toThrow('Error al eliminar tarea')
    })
  })
})
