import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

export const getTareas = async () => {
  try {
    console.log("Fetching tareas...");

    await new Promise((resolve) => setTimeout(resolve, 800));
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

export const createTarea = async (descripcion) => {
  try {
    console.log("Creating tarea:", { descripcion });
    await new Promise((resolve) => setTimeout(resolve, 600));

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

export const updateTarea = async (id, descripcion) => {
  try {
    console.log("Updating tarea:", { id, descripcion });

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
export const deleteTarea = async (id) => {
  try {
    console.log("Deleting tarea:", { id });

    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw new Error(error.response?.data?.message || "Error al eliminar tarea");
  }
};
export const reorderTareas = async (newOrder) => {
  try {
    console.log("Reordering tareas:", newOrder);

    await new Promise((resolve) => setTimeout(resolve, 400));
  } catch (error) {
    console.error("Error al reordenar tareas:", error);
    throw new Error(
      error.response?.data?.message || "Error al reordenar tareas"
    );
  }
};
