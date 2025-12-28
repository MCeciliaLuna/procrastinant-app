/**
 * Store de Tareas (Zustand)
 *
 * Maneja el estado global de las tareas del usuario, incluyendo:
 * - Lista de tareas
 * - Orden personalizado de tareas (persistido en localStorage)
 * - Estado de búsqueda y paginación
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Hook del store de tareas
 * Solo el orden personalizado se persiste en localStorage
 */
export const useTareasStore = create(
  persist(
    (set, get) => ({
      // ========================
      // ESTADO
      // ========================

      /**
       * Lista de tareas del usuario
       */
      tareas: [],

      /**
       * Query de búsqueda actual
       */
      searchQuery: "",

      /**
       * Página actual para paginación
       */
      currentPage: 1,

      /**
       * Orden personalizado de tareas (persistido)
       * Map de ID de tarea a posición de orden
       */
      customOrder: {},

      // ========================
      // ACCIONES
      // ========================

      /**
       * Establecer lista completa de tareas
       * @param {Array} tareas - Lista de tareas
       */
      setTareas: (tareas) => set({ tareas }),

      /**
       * Agregar una nueva tarea
       * @param {Object} tarea - Tarea a agregar
       */
      addTarea: (tarea) =>
        set((state) => ({
          tareas: [...state.tareas, tarea],
        })),

      /**
       * Actualizar una tarea existente
       * @param {string} id - ID de la tarea
       * @param {Object} data - Datos a actualizar
       */
      updateTarea: (id, data) =>
        set((state) => ({
          tareas: state.tareas.map((tarea) =>
            tarea.id === id ? { ...tarea, ...data } : tarea
          ),
        })),

      /**
       * Eliminar una tarea
       * @param {string} id - ID de la tarea
       */
      deleteTarea: (id) =>
        set((state) => ({
          tareas: state.tareas.filter((tarea) => tarea.id !== id),
        })),

      /**
       * Guardar nuevo orden personalizado de tareas
       * @param {Object} newOrder - Map de ID a posición de orden
       */
      reorderTareas: (newOrder) => set({ customOrder: newOrder }),

      /**
       * Establecer query de búsqueda
       * @param {string} query - Texto de búsqueda
       */
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      /**
       * Establecer página actual
       * @param {number} page - Número de página
       */
      setCurrentPage: (page) => set({ currentPage: page }),

      /**
       * Obtener tareas ordenadas según el orden personalizado
       * @returns {Array} Tareas ordenadas
       */
      getOrderedTareas: () => {
        const state = get();
        const { tareas, customOrder } = state;

        // Si no hay orden personalizado, devolver tareas en orden original
        if (Object.keys(customOrder).length === 0) {
          return tareas;
        }

        // Ordenar tareas según el orden personalizado
        return [...tareas].sort((a, b) => {
          const orderA = customOrder[a.id] ?? Infinity;
          const orderB = customOrder[b.id] ?? Infinity;
          return orderA - orderB;
        });
      },
    }),
    {
      name: "tareas-storage", // Nombre del key en localStorage
      partialize: (state) => ({ customOrder: state.customOrder }), // Solo persistir customOrder
    }
  )
);
