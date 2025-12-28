/**
 * Custom Hook: useAuth
 *
 * Hook para acceder al store de autenticación y funciones relacionadas.
 * Proporciona una interfaz simplificada para manejar autenticación en componentes.
 */

import { useAuthStore } from "../stores/authStore";
import * as authService from "../features/autenticacion/services/authService";
import { useToast } from "./useToast";

/**
 * Hook de autenticación
 * @returns {Object} Estado y funciones de autenticación
 */
export const useAuth = () => {
  // Obtener estado del store
  const {
    user,
    token,
    isAuthenticated,
    login: loginStore,
    logout: logoutStore,
    updateUser: updateUserStore,
  } = useAuthStore();
  const { showSuccess, showError } = useToast();

  /**
   * Realizar login
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<boolean>} True si el login fue exitoso
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        loginStore(response.user, response.token);
        showSuccess("¡Bienvenido de vuelta!");
        return true;
      }

      return false;
    } catch (error) {
      showError(error.message || "Error al iniciar sesión");
      return false;
    }
  };

  /**
   * Realizar registro
   * @param {Object} userData - Datos del usuario
   * @returns {Promise<boolean>} True si el registro fue exitoso
   */
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      if (response.success) {
        loginStore(response.user, response.token);
        showSuccess("¡Cuenta creada exitosamente!");
        return true;
      }

      return false;
    } catch (error) {
      showError(error.message || "Error al registrar usuario");
      return false;
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    try {
      await authService.logout();
      logoutStore();
      showSuccess("Sesión cerrada");
    } catch (error) {
      // Cerrar sesión local aunque falle el logout en el servidor
      logoutStore();
      console.error("Error al cerrar sesión:", error);
    }
  };

  /**
   * Actualizar datos del usuario
   * @param {Object} userData - Datos a actualizar
   */
  const updateUser = (userData) => {
    updateUserStore(userData);
  };

  return {
    // Estado
    user,
    token,
    isAuthenticated,

    // Funciones
    login,
    register,
    logout,
    updateUser,
  };
};
