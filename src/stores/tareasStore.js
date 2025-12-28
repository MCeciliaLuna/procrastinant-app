import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTareasStore = create(
  persist(
    (set, get) => ({
      tareas: [],
      searchQuery: "",

      customOrder: {},
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
      reorderTareas: (newOrder) => set({ customOrder: newOrder }),
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

      setCurrentPage: (page) => set({ currentPage: page }),

      getOrderedTareas: () => {
        const state = get();
        const { tareas, customOrder } = state;

        if (Object.keys(customOrder).length === 0) {
          return tareas;
        }

        return [...tareas].sort((a, b) => {
          const orderA = customOrder[a.id] ?? Infinity;
          const orderB = customOrder[b.id] ?? Infinity;
          return orderA - orderB;
        });
      },
    }),
    {
      name: "tareas-storage",
      partialize: (state) => ({ customOrder: state.customOrder }),
    }
  )
);
