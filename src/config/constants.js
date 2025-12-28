/**
 * Constantes Globales del Proyecto Procrastinant
 *
 * Este archivo centraliza todas las constantes utilizadas en la aplicación,
 * incluyendo duraciones, mensajes de validación, tipos de notificaciones y endpoints de API.
 */

// ========================
// DURACIONES Y TIEMPOS
// ========================

/**
 * Duración predeterminada de las notificaciones toast (en milisegundos)
 */
export const TOAST_DURATION = 3000; // 3 segundos

/**
 * Tiempo de espera antes de eliminar una tarea completada (en milisegundos)
 */
export const TASK_COMPLETION_DELAY = 5000; // 5 segundos

/**
 * Intervalo para rotar frases motivacionales (en milisegundos)
 */
export const MOTIVATIONAL_PHRASE_INTERVAL = 10000; // 10 segundos

// ========================
// MENSAJES DE VALIDACIÓN
// ========================

/**
 * Mensajes de validación en español para formularios
 * Utilizados con React Hook Form
 */
export const VALIDATION_MESSAGES = {
  required: "Este campo es requerido",
  email: "Ingresa un email válido",
  minLength: (min) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max) => `No puede exceder ${max} caracteres`,
  password:
    "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
  passwordMatch: "Las contraseñas no coinciden",
  onlyLetters: "Solo se permiten letras",
  alphanumeric: "Solo se permiten letras y números",
};

// ========================
// TIPOS DE TOASTS
// ========================

/**
 * Tipos de notificaciones toast disponibles
 * Cada tipo tiene su propio estilo visual
 */
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// ========================
// ENDPOINTS API
// ========================

/**
 * Endpoints de la API REST
 * Estos endpoints serán utilizados cuando el backend esté disponible
 */
export const API_ENDPOINTS = {
  // Autenticación
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  RECOVER_PASSWORD: "/auth/recover",

  // Tareas
  GET_TAREAS: "/tareas",
  CREATE_TAREA: "/tareas",
  UPDATE_TAREA: (id) => `/tareas/${id}`,
  DELETE_TAREA: (id) => `/tareas/${id}`,
  REORDER_TAREAS: "/tareas/reorder",

  // Usuario
  GET_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/password",
  DELETE_ACCOUNT: "/user/account",
};

// ========================
// PATRONES DE VALIDACIÓN
// ========================

/**
 * Expresiones regulares para validación de campos
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};
