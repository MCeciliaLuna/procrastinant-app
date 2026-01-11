import {create} from 'zustand'

export const useUIStore = create((set) => ({
  isLoading: false,
  toasts: [],

  modals: {
    deleteTask: {
      isOpen: false,
      taskId: null,
    },
    deleteAccount: {
      isOpen: false,
    },
  },
  setLoading: (isLoading) => set({isLoading}),

  addToast: (message, type = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random()}`

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
    }))

    return id
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
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
  closeModal: (modalName) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: {
          isOpen: false,
          ...(modalName === 'deleteTask' && {taskId: null}),
        },
      },
    })),
}))
