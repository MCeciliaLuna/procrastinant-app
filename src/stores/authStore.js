/**
 * Store de Autenticación (Zustand)
 *
 * Maneja el estado global de autenticación del usuario, incluyendo:
 * - Información del usuario
 * - Token de autenticación
 * - Estado de autenticación
 */

import { create } from "zustand";

/**
 * Hook del store de autenticación
 */
export const useAuthStore = create((set) => ({
  // ========================
  // ESTADO
  // ========================

  /**
   * Información del usuario actual
   */
  user: {
    nombre: "",
    apellido: "",
    alias: "",
    email: "",
  },

  /**
   * Token JWT de autenticación
   */
  token: null,

  /**
   * Indica si el usuario está autenticado
   */
  isAuthenticated: false,

  // ========================
  // ACCIONES
  // ========================

  /**
   * Establecer información del usuario
   * @param {Object} user - Datos del usuario
   */
  setUser: (user) => set({ user, isAuthenticated: true }),

  /**
   * Establecer token de autenticación
   * @param {string} token - Token JWT
   */
  setToken: (token) => set({ token }),

  /**
   * Realizar login completo
   * @param {Object} user - Datos del usuario
   * @param {string} token - Token JWT
   */
  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  /**
   * Cerrar sesión y limpiar estado
   */
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

  /**
   * Actualizar datos del usuario
   * @param {Object} userData - Datos a actualizar
   */
  updateUser: (userData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...userData,
      },
    })),
}));
