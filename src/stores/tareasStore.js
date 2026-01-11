import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import * as tareasService from '../features/dashboard/services/tareasService'

export const useTareasStore = create(
  devtools(
    persist(
      (set, get) => ({
        tareas: [],
        searchQuery: '',
        isLoading: false,
        error: null,

        setTareas: (tareas) => set({tareas}),

        addTarea: (tarea) =>
          set((state) => ({
            tareas: [...state.tareas, tarea],
          })),

        updateTarea: (id, data) =>
          set((state) => ({
            tareas: state.tareas.map((tarea) =>
              tarea.id === id ? {...tarea, ...data} : tarea,
            ),
          })),

        deleteTarea: (id) =>
          set((state) => ({
            tareas: state.tareas.filter((tarea) => tarea.id !== id),
          })),

        setSearchQuery: (query) => set({searchQuery: query}),

        getFilteredTareas: () => {
          const state = get()
          const {tareas, searchQuery} = state

          if (!searchQuery) return tareas

          return tareas.filter((tarea) =>
            tarea.descripcion.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        },

        fetchTareasAsync: async () => {
          set({isLoading: true, error: null})
          try {
            const result = await tareasService.getTareas()

            if (result.success && result.data) {
              set({
                tareas: result.data,
                isLoading: false,
                error: null,
              })
              return {success: true, data: result.data}
            } else {
              set({
                isLoading: false,
                error: result.message || 'Error al obtener tareas',
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || 'Error de conexión'
            set({
              isLoading: false,
              error: errorMessage,
            })
            return {success: false, message: errorMessage}
          }
        },

        createTareaAsync: async (tareaData) => {
          set({isLoading: true, error: null})
          try {
            const result = await tareasService.createTarea(tareaData)

            if (result.success && result.data) {
              set((state) => ({
                tareas: [...state.tareas, result.data],
                isLoading: false,
                error: null,
              }))
              return {success: true, data: result.data}
            } else {
              set({
                isLoading: false,
                error: result.message || 'Error al crear tarea',
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || 'Error de conexión'
            set({
              isLoading: false,
              error: errorMessage,
            })
            return {success: false, message: errorMessage}
          }
        },

        updateTareaAsync: async (id, tareaData) => {
          set({isLoading: true, error: null})
          try {
            const result = await tareasService.updateTarea(id, tareaData)

            if (result.success) {
              set((state) => ({
                tareas: state.tareas.map((tarea) =>
                  tarea.id === id ? {...tarea, ...tareaData} : tarea,
                ),
                isLoading: false,
                error: null,
              }))
              return {success: true}
            } else {
              set({
                isLoading: false,
                error: result.message || 'Error al actualizar tarea',
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || 'Error de conexión'
            set({
              isLoading: false,
              error: errorMessage,
            })
            return {success: false, message: errorMessage}
          }
        },

        deleteTareaAsync: async (id) => {
          set({isLoading: true, error: null})
          try {
            const result = await tareasService.deleteTarea(id)

            if (result.success) {
              set((state) => ({
                tareas: state.tareas.filter((tarea) => tarea.id !== id),
                isLoading: false,
                error: null,
              }))
              return {success: true}
            } else {
              set({
                isLoading: false,
                error: result.message || 'Error al eliminar tarea',
              })
              return {success: false, message: result.message}
            }
          } catch (error) {
            const errorMessage =
              error.response?.data?.message || 'Error de conexión'
            set({
              isLoading: false,
              error: errorMessage,
            })
            return {success: false, message: errorMessage}
          }
        },

        clearError: () => set({error: null}),
      }),
      {
        name: 'tareas-storage',
      },
    ),
    {name: 'TareasStore'},
  ),
)
