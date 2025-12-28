/**
 * Custom Hook: useToast
 *
 * Hook para mostrar notificaciones toast en la aplicación.
 * Proporciona funciones simplificadas para mostrar diferentes tipos de toasts.
 */

import { useUIStore } from "../stores/uiStore";
import { TOAST_DURATION, TOAST_TYPES } from "../config/constants";

/**
 * Hook de toasts
 * @returns {Object} Funciones para manejar toasts
 */
export const useToast = () => {
  const { toasts, addToast, removeToast } = useUIStore();

  /**
   * Mostrar un toast genérico
   * @param {string} message - Mensaje del toast
   * @param {string} type - Tipo de toast (success, error, info, warning)
   * @param {number} duration - Duración en ms
   */
  const showToast = (
    message,
    type = TOAST_TYPES.INFO,
    duration = TOAST_DURATION
  ) => {
    const toastId = addToast(message, type, duration);

    // Auto-eliminar el toast después de la duración especificada
    setTimeout(() => {
      removeToast(toastId);
    }, duration);
  };

  /**
   * Mostrar toast de éxito
   * @param {string} message - Mensaje del toast
   * @param {number} duration - Duración en ms (opcional)
   */
  const showSuccess = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.SUCCESS, duration);
  };

  /**
   * Mostrar toast de error
   * @param {string} message - Mensaje del toast
   * @param {number} duration - Duración en ms (opcional)
   */
  const showError = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.ERROR, duration);
  };

  /**
   * Mostrar toast informativo
   * @param {string} message - Mensaje del toast
   * @param {number} duration - Duración en ms (opcional)
   */
  const showInfo = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.INFO, duration);
  };

  /**
   * Mostrar toast de advertencia
   * @param {string} message - Mensaje del toast
   * @param {number} duration - Duración en ms (opcional)
   */
  const showWarning = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.WARNING, duration);
  };

  return {
    // Estado
    toasts,

    // Funciones
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
  };
};
