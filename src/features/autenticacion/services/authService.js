/**
 * Servicio de Autenticación
 *
 * Maneja todas las peticiones relacionadas con autenticación:
 * - Login
 * - Registro
 * - Recuperación de contraseña
 * - Logout
 */

import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

/**
 * Login de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Datos del usuario y token
 */
export const login = async (email, password) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Login intent:", { email });

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulación de respuesta exitosa
    return {
      success: true,
      user: {
        nombre: "Usuario",
        apellido: "Demo",
        alias: "demo",
        email: email,
      },
      token: "mock-jwt-token-12345",
    };
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};

/**
 * Registro de usuario
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.nombre - Nombre
 * @param {string} userData.apellido - Apellido
 * @param {string} userData.alias - Alias (opcional)
 * @param {string} userData.email - Email
 * @param {string} userData.password - Contraseña
 * @returns {Promise<Object>} Datos del usuario y token
 */
export const register = async (userData) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Register intent:", userData);

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulación de respuesta exitosa
    return {
      success: true,
      user: {
        nombre: userData.nombre,
        apellido: userData.apellido,
        alias: userData.alias || "",
        email: userData.email,
      },
      token: "mock-jwt-token-67890",
    };
  } catch (error) {
    console.error("Error en registro:", error);
    throw new Error(
      error.response?.data?.message || "Error al registrar usuario"
    );
  }
};

/**
 * Recuperar contraseña
 * @param {string} email - Email del usuario
 * @returns {Promise<Object>} Confirmación de envío
 */
export const recoverPassword = async (email) => {
  try {
    // TODO: Implementar cuando exista backend
    // const response = await apiClient.post(API_ENDPOINTS.RECOVER_PASSWORD, { email });
    // return response.data;

    // MOCK: Datos simulados para testing
    console.log("Password recovery intent:", { email });

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message:
        "Se ha enviado un correo con instrucciones para recuperar tu contraseña",
    };
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    throw new Error(
      error.response?.data?.message || "Error al recuperar contraseña"
    );
  }
};

/**
 * Logout de usuario
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    // TODO: Implementar cuando exista backend
    // await apiClient.post(API_ENDPOINTS.LOGOUT);

    // MOCK: Logging de logout
    console.log("Logout successful");

    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error en logout:", error);
    // No lanzar error, permitir logout local aunque falle el servidor
  }
};
