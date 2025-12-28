/**
 * Servicio de Tareas
 *
 * Maneja todas las peticiones relacionadas con tareas:
 * - Obtener tareas
 * - Crear tarea
 * - Actualizar tarea
 * - Eliminar tarea
 * - Reordenar tareas
 */

import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

/**
 * Obtener todas las tareas del usuario
 * @returns {Promise<Array>} Lista de tareas
 */
export const getTareas = async () => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.get(API_ENDPOINTS.GET_TAREAS);
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Fetching tareas...");

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulación de tareas de ejemplo
    return [
      {
        id: "1",
        descripcion: "Completar documentación del proyecto",
        order: 0,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        descripcion: "Revisar código de la feature de login",
        order: 1,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        descripcion: "Preparar presentación para el equipo",
        order: 2,
        createdAt: new Date().toISOString(),
      },
    ];
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    throw new Error(error.response?.data?.message || "Error al obtener tareas");
  }
};

/**
 * Crear una nueva tarea
 * @param {string} descripcion - Descripción de la tarea
 * @returns {Promise<Object>} Tarea creada
 */
export const createTarea = async (descripcion) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.post(API_ENDPOINTS.CREATE_TAREA, { descripcion });
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Creating tarea:", { descripcion });

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simulación de tarea creada
    return {
      id: `${Date.now()}`,
      descripcion,
      order: 0,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error al crear tarea:", error);
    throw new Error(error.response?.data?.message || "Error al crear tarea");
  }
};

/**
 * Actualizar una tarea existente
 * @param {string} id - ID de la tarea
 * @param {string} descripcion - Nueva descripción
 * @returns {Promise<Object>} Tarea actualizada
 */
export const updateTarea = async (id, descripcion) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.put(API_ENDPOINTS.UPDATE_TAREA(id), { descripcion });
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Updating tarea:", { id, descripcion });

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      id,
      descripcion,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    throw new Error(
      error.response?.data?.message || "Error al actualizar tarea"
    );
  }
};

/**
 * Eliminar una tarea
 * @param {string} id - ID de la tarea
 * @returns {Promise<void>}
 */
export const deleteTarea = async (id) => {
  try {
    // TODO: Implementar cuando exista backend
    // await apiClient.delete(API_ENDPOINTS.DELETE_TAREA(id));

    // MOCK: Datos simulados para testing
    console.log("Deleting tarea:", { id });

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw new Error(error.response?.data?.message || "Error al eliminar tarea");
  }
};

/**
 * Reordenar tareas (guardar orden personalizado)
 * @param {Object} newOrder - Map de ID de tarea a posición
 * @returns {Promise<void>}
 */
export const reorderTareas = async (newOrder) => {
  try {
    // TODO: Implementar cuando exista backend
    // await apiClient.post(API_ENDPOINTS.REORDER_TAREAS, { order: newOrder });

    // MOCK: Datos simulados para testing
    console.log("Reordering tareas:", newOrder);

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 400));

    // El orden se guarda localmente en el store con persistencia
  } catch (error) {
    console.error("Error al reordenar tareas:", error);
    throw new Error(
      error.response?.data?.message || "Error al reordenar tareas"
    );
  }
};
