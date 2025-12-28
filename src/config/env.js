/**
 * Configuración de Variables de Entorno
 *
 * Este módulo centraliza el acceso a las variables de entorno de la aplicación.
 * Todas las variables de entorno deben ser accedidas a través de este archivo.
 */

/**
 * URL base de la API REST del backend
 * @type {string}
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * URL de la API de frases motivacionales
 * @type {string}
 */
export const MOTIVATIONAL_API_URL =
  import.meta.env.VITE_MOTIVATIONAL_API_URL || "https://api.quotable.io";

/**
 * Entorno de la aplicación (development, production, test)
 * @type {string}
 */
export const APP_ENV = import.meta.env.VITE_APP_ENV || "development";

/**
 * Indica si la aplicación está en modo desarrollo
 * @type {boolean}
 */
export const IS_DEVELOPMENT = APP_ENV === "development";

/**
 * Indica si la aplicación está en modo producción
 * @type {boolean}
 */
export const IS_PRODUCTION = APP_ENV === "production";
