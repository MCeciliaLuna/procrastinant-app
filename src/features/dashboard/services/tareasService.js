import apiClient from '../../../config/axios'
import {API_ENDPOINTS} from '../../../config/constants'
import {backendToFrontend, backendArrayToFrontend} from '../../../services/mappers/tareaMapper'

export const getTareas = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters)
    const response = await apiClient.get(`${API_ENDPOINTS.GET_TAREAS}?${params}`)
    if (response.data.success && response.data.data?.tareas) {
      return backendArrayToFrontend(response.data.data.tareas)
    }

    return []
  } catch (error) {
    console.error('Error al obtener tareas:', error)
    throw new Error(error.response?.data?.message || 'Error al obtener tareas')
  }
}

export const createTarea = async (descripcion, numeroOrden = 0) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CREATE_TAREA, {
      descripcion,
      numeroOrden,
      listo: false,
    })
    if (response.data.success && response.data.data?.tarea) {
      return backendToFrontend(response.data.data.tarea)
    }

    return null
  } catch (error) {
    console.error('Error al crear tarea:', error)
    throw new Error(error.response?.data?.message || 'Error al crear tarea')
  }
}

export const updateTarea = async (id, updates) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.UPDATE_TAREA(id), updates)

    if (response.data.success && response.data.data?.tarea) {
      return backendToFrontend(response.data.data.tarea)
    }

    return null
  } catch (error) {
    console.error('Error al actualizar tarea:', error)
    throw new Error(error.response?.data?.message || 'Error al actualizar tarea')
  }
}

export const toggleTarea = async (id, listo = null) => {
  try {
    const body = listo !== null ? {listo} : {}

    const response = await apiClient.patch(API_ENDPOINTS.TOGGLE_TAREA(id), body)

    if (response.data.success && response.data.data?.tarea) {
      return backendToFrontend(response.data.data.tarea)
    }

    return null
  } catch (error) {
    console.error('Error al cambiar estado de tarea:', error)
    throw new Error(error.response?.data?.message || 'Error al cambiar estado de tarea')
  }
}

export const deleteTarea = async (id) => {
  try {
    await apiClient.delete(API_ENDPOINTS.DELETE_TAREA(id))
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
    throw new Error(error.response?.data?.message || 'Error al eliminar tarea')
  }
}
