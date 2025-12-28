/**
 * Componente Toast
 *
 * Componente de notificaciones toast que se muestra en la parte superior de la pantalla.
 * Se suscribe al store de UI para mostrar todos los toasts activos.
 */

import { useEffect } from "react";
import { useUIStore } from "../../stores/uiStore";

/**
 * Componente de Toast individual
 */
const ToastItem = ({ toast }) => {
  const { removeToast } = useUIStore();

  useEffect(() => {
    // Auto-eliminar el toast después de su duración
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  // Estilos según el tipo de toast
  const getToastClass = () => {
    const baseClass = "toast-item";
    switch (toast.type) {
      case "success":
        return `${baseClass} toast-success`;
      case "error":
        return `${baseClass} toast-error`;
      case "warning":
        return `${baseClass} toast-warning`;
      case "info":
      default:
        return `${baseClass} toast-info`;
    }
  };

  return (
    <div className={getToastClass()}>
      <p className="toast-message">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="toast-close"
        aria-label="Cerrar"
      >
        ×
      </button>
    </div>
  );
};

/**
 * Contenedor de Toasts
 */
export const Toast = () => {
  const { toasts } = useUIStore();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default Toast;
