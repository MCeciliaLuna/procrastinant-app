import { create } from "zustand";

export const useTareasStore = create((set, get) => ({
  tareas: [],
  searchQuery: "",

  setTareas: (tareas) => set({ tareas }),

  addTarea: (tarea) =>
    set((state) => ({
      tareas: [...state.tareas, tarea],
    })),

  updateTarea: (id, data) =>
    set((state) => ({
      tareas: state.tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, ...data } : tarea
      ),
    })),

  deleteTarea: (id) =>
    set((state) => ({
      tareas: state.tareas.filter((tarea) => tarea.id !== id),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredTareas: () => {
    const state = get();
    const { tareas, searchQuery } = state;

    if (!searchQuery) return tareas;

    return tareas.filter((tarea) =>
      tarea.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },
}));
