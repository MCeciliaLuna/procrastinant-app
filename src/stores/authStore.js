import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: {
    nombre: "",
    apellido: "",
    alias: "",
    email: "",
  },
  token: null,

  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  setToken: (token) => set({ token }),

  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: {
        nombre: "",
        apellido: "",
        alias: "",
        email: "",
      },
      token: null,
      isAuthenticated: false,
    }),
  updateUser: (userData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
      },
    })),
}));
