/**
 * Servicio de Usuario
 *
 * Maneja todas las peticiones relacionadas con la gestión de usuario:
 * - Obtener perfil
 * - Actualizar perfil
 * - Cambiar contraseña
 * - Eliminar cuenta
 */

import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

/**
 * Obtener perfil del usuario actual
 * @returns {Promise<Object>} Datos del perfil
 */
export const getProfile = async () => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE);
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Fetching user profile...");

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      nombre: "Usuario",
      apellido: "Demo",
      alias: "demo",
      email: "usuario@demo.com",
    };
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw new Error(error.response?.data?.message || "Error al obtener perfil");
  }
};

/**
 * Actualizar perfil del usuario
 * @param {Object} userData - Datos a actualizar
 * @param {string} userData.nombre - Nombre
 * @param {string} userData.apellido - Apellido
 * @param {string} userData.alias - Alias (opcional)
 * @param {string} userData.email - Email
 * @returns {Promise<Object>} Perfil actualizado
 */
export const updateProfile = async (userData) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, userData);
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Updating user profile:", userData);

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      user: userData,
      message: "Perfil actualizado exitosamente",
    };
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw new Error(
      error.response?.data?.message || "Error al actualizar perfil"
    );
  }
};

/**
 * Cambiar contraseña del usuario
 * @param {string} currentPassword - Contraseña actual
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>} Confirmación
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.put(API_ENDPOINTS.CHANGE_PASSWORD, {
    //   currentPassword,
    //   newPassword,
    // });
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Changing password...");

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 700));

    return {
      success: true,
      message: "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw new Error(
      error.response?.data?.message || "Error al cambiar contraseña"
    );
  }
};

/**
 * Eliminar cuenta del usuario
 * @returns {Promise<void>}
 */
export const deleteAccount = async () => {
  try {
    // TODO: Implementar cuando exista backend
    // await apiClient.delete(API_ENDPOINTS.DELETE_ACCOUNT);

    // MOCK: Datos simulados para testing
    console.log("Deleting user account...");

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Cuenta eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    throw new Error(
      error.response?.data?.message || "Error al eliminar cuenta"
    );
  }
};
