import {useUIStore} from '../stores/uiStore'
import {TOAST_DURATION, TOAST_TYPES} from '../config/constants'
export const useToast = () => {
  const {toasts, addToast, removeToast} = useUIStore()

  const showToast = (message, type = TOAST_TYPES.INFO, duration = TOAST_DURATION) => {
    const toastId = addToast(message, type, duration)

    setTimeout(() => {
      removeToast(toastId)
    }, duration)
  }
  const showSuccess = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.SUCCESS, duration)
  }

  const showError = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.ERROR, duration)
  }
  const showInfo = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.INFO, duration)
  }
  const showWarning = (message, duration = TOAST_DURATION) => {
    showToast(message, TOAST_TYPES.WARNING, duration)
  }

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
  }
}
