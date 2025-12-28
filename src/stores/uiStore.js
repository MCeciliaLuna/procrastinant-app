/**
 * Store de UI (Zustand)
 *
 * Maneja el estado global de la interfaz de usuario, incluyendo:
 * - Estados de carga (loading)
 * - Notificaciones toast
 * - Estados de modales
 */

import { create } from "zustand";

/**
 * Hook del store de UI
 */
export const useUIStore = create((set) => ({
  // ========================
  // ESTADO
  // ========================

  /**
   * Indica si hay una petición en curso (loading global)
   */
  isLoading: false,

  /**
   * Lista de toasts activos
   * Cada toast tiene: { id, message, type, duration }
   */
  toasts: [],

  /**
   * Estados de los modales de la aplicación
   */
  modals: {
    deleteTask: {
      isOpen: false,
      taskId: null,
    },
    deleteAccount: {
      isOpen: false,
    },
  },

  // ========================
  // ACCIONES - LOADING
  // ========================

  /**
   * Establecer estado de carga global
   * @param {boolean} isLoading - Estado de carga
   */
  setLoading: (isLoading) => set({ isLoading }),

  // ========================
  // ACCIONES - TOASTS
  // ========================

  /**
   * Agregar un nuevo toast
   * @param {string} message - Mensaje del toast
   * @param {string} type - Tipo de toast (success, error, info, warning)
   * @param {number} duration - Duración en ms (opcional)
   * @returns {string} ID del toast creado
   */
  addToast: (message, type = "info", duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`;

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          message,
          type,
          duration,
        },
      ],
    }));

    return id;
  },

  /**
   * Eliminar un toast por su ID
   * @param {string} id - ID del toast
   */
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  // ========================
  // ACCIONES - MODALES
  // ========================

  /**
   * Abrir un modal específico
   * @param {string} modalName - Nombre del modal
   * @param {Object} data - Datos adicionales del modal (opcional)
   */
  openModal: (modalName, data = {}) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: {
          isOpen: true,
          ...data,
        },
      },
    })),

  /**
   * Cerrar un modal específico
   * @param {string} modalName - Nombre del modal
   */
  closeModal: (modalName) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: {
          isOpen: false,
          ...(modalName === "deleteTask" && { taskId: null }),
        },
      },
    })),
}));
