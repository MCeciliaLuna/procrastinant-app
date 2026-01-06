import { create } from "zustand";
import { saveToken, removeToken, getToken } from "../utils/tokenManager";

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

  setToken: (token) => {
    saveToken(token);
    set({ token });
  },

  login: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    removeToken();
    set({
      user: {
        nombre: "",
        apellido: "",
        alias: "",
        email: "",
      },
      token: null,
      isAuthenticated: false,
    });
  },

  updateUser: (userData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
      },
    })),

  hydrate: () => {
    const token = getToken();
    if (token) {
      set({ token });
    }
  },
}));
