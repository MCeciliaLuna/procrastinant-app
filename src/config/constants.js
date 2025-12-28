export const TOAST_DURATION = 3000;
export const TASK_COMPLETION_DELAY = 5000;

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

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  GET_TAREAS: "/tareas",
  CREATE_TAREA: "/tareas",
  UPDATE_TAREA: (id) => `/tareas/${id}`,
  DELETE_TAREA: (id) => `/tareas/${id}`,
  REORDER_TAREAS: "/tareas/reorder",

  GET_PROFILE: "/user/profile",
  UPDATE_PROFILE: "/user/profile",
  CHANGE_PASSWORD: "/user/password",
  DELETE_ACCOUNT: "/user/account",
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  ONLY_LETTERS: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
};
