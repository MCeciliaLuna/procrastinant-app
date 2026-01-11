export const getErrorMessage = (error, context = 'general') => {
  const errorCode = error?.code || error?.message || error || 'unknown'

  const errorMap = {
    // Errores de autenticación - mensajes amigables y empáticos
    'Credenciales inválidas': {
      message: '¡Ups! Parece que el email o la contraseña no son correctos',
      suggestion:
        'Revisa que hayas escrito bien tu email y contraseña. Si olvidaste tu contraseña, puedes recuperarla.',
      code: 'auth/invalid-credentials',
    },
    'auth/invalid-credentials': {
      message: '¡Ups! Parece que el email o la contraseña no son correctos',
      suggestion: 'Revisa que hayas escrito bien tus datos e intenta nuevamente.',
      code: 'auth/invalid-credentials',
    },
    'auth/user-not-found': {
      message: 'No encontramos una cuenta con este email',
      suggestion: '¿Quieres crear una cuenta nueva?',
      code: 'auth/user-not-found',
    },
    'auth/email-already-exists': {
      message: 'Este email ya está registrado',
      suggestion: '¿Ya tienes cuenta? Intenta iniciar sesión.',
      code: 'auth/email-already-exists',
    },
    'auth/weak-password': {
      message: 'La contraseña es demasiado débil',
      suggestion: 'Usa al menos 8 caracteres con letras y números.',
      code: 'auth/weak-password',
    },
    'auth/invalid-email': {
      message: 'El email no tiene un formato válido',
      suggestion: 'Verifica que hayas escrito correctamente tu email.',
      code: 'auth/invalid-email',
    },

    'network-error': {
      message: 'Error de conexión',
      suggestion: 'Verifica tu conexión a internet e intenta nuevamente.',
      code: 'network-error',
    },
    'Error de conexión': {
      message: 'No pudimos conectarnos con el servidor',
      suggestion: 'Verifica tu conexión a internet e intenta nuevamente.',
      code: 'network-error',
    },

    'task/not-found': {
      message: 'La tarea no existe o fue eliminada',
      suggestion: 'Recarga la página para ver las tareas actualizadas.',
      code: 'task/not-found',
    },
    'task/create-failed': {
      message: 'No pudimos crear la tarea',
      suggestion: 'Intenta nuevamente en unos momentos.',
      code: 'task/create-failed',
    },
    'task/update-failed': {
      message: 'No pudimos actualizar la tarea',
      suggestion: 'Verifica tu conexión e intenta nuevamente.',
      code: 'task/update-failed',
    },
    'task/delete-failed': {
      message: 'No pudimos eliminar la tarea',
      suggestion: 'Intenta nuevamente en unos momentos.',
      code: 'task/delete-failed',
    },

    'server/internal-error': {
      message: 'Ocurrió un error en el servidor',
      suggestion: 'Estamos trabajando para solucionarlo. Intenta más tarde.',
      code: 'server/internal-error',
    },
    'server/maintenance': {
      message: 'El servidor está en mantenimiento',
      suggestion: 'Volveremos pronto. Intenta en unos minutos.',
      code: 'server/maintenance',
    },

    unknown: {
      message: 'Ocurrió un error inesperado',
      suggestion: 'Por favor, intenta nuevamente más tarde.',
      code: 'unknown',
    },
  }

  const errorInfo = errorMap[errorCode] || errorMap[error?.message] || errorMap.unknown

  return {
    message: errorInfo.message,
    suggestion: errorInfo.suggestion,
    code: errorInfo.code,
  }
}

export const formatErrorMessage = (errorInfo) => {
  if (!errorInfo) return ''
  return `${errorInfo.message}. ${errorInfo.suggestion}`
}
