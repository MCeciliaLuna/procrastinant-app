/**
 * Configuración de Axios
 *
 * Este archivo configura la instancia de Axios utilizada en toda la aplicación.
 * Incluye interceptors para:
 * - Agregar automáticamente el token de autenticación a las peticiones
 * - Manejar estados de carga globales
 * - Centralizar el manejo de errores HTTP
 */

import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { useUIStore } from "../stores/uiStore";
import { API_BASE_URL } from "./env";

/**
 * Instancia configurada de Axios
 * Todas las peticiones HTTP deben usar esta instancia
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================
// REQUEST INTERCEPTOR
// ========================

/**
 * Interceptor de peticiones
 * - Agrega el token de autenticación si existe
 * - Activa el estado de carga global
 */
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token del store de autenticación
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Activar loading global
    useUIStore.getState().setLoading(true);

    return config;
  },
  (error) => {
    // Desactivar loading en caso de error
    useUIStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// ========================
// RESPONSE INTERCEPTOR
// ========================

/**
 * Interceptor de respuestas
 * - Desactiva el estado de carga global
 * - Maneja errores HTTP comunes
 */
apiClient.interceptors.response.use(
  (response) => {
    // Desactivar loading cuando la petición es exitosa
    useUIStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    // Desactivar loading cuando hay error
    useUIStore.getState().setLoading(false);

    // Manejo centralizado de errores HTTP
    if (error.response) {
      // El servidor respondió con un código de error
      switch (error.response.status) {
        case 401:
          // No autenticado - limpiar sesión
          console.error("Sesión expirada o no autenticado");
          useAuthStore.getState().logout();
          break;

        case 403:
          // No autorizado
          console.error("No tienes permisos para esta acción");
          break;

        case 404:
          // Recurso no encontrado
          console.error("Recurso no encontrado");
          break;

        case 500:
          // Error del servidor
          console.error("Error del servidor. Por favor, intenta más tarde");
          break;

        default:
          console.error(
            "Error en la petición:",
            error.response.data?.message || "Error desconocido"
          );
      }
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error(
        "No hay respuesta del servidor. Verifica tu conexión a internet"
      );
    } else {
      // Error al configurar la petición
      console.error("Error al configurar la petición:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
