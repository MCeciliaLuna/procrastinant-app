/**
 * Custom Hook: useApi
 *
 * Hook wrapper de Axios con estados de loading y error locales.
 * Útil para componentes que necesitan manejar su propio estado de carga
 * sin afectar el loading global.
 */

import { useState } from "react";

/**
 * Hook para ejecutar llamadas a API con estados locales
 * @returns {Object} Estado y función execute
 */
export const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Ejecutar una función de servicio
   * @param {Function} apiFunction - Función del servicio a ejecutar
   * @param {...any} args - Argumentos para la función
   * @returns {Promise<any>} Resultado de la función
   */
  const execute = async (apiFunction, ...args) => {
    try {
      // Iniciar loading
      setIsLoading(true);
      setError(null);

      // Ejecutar función del servicio
      const result = await apiFunction(...args);

      // Guardar resultado
      setData(result);
      setIsLoading(false);

      return result;
    } catch (err) {
      // Manejar error
      setError(err.message || "Error en la petición");
      setIsLoading(false);
      throw err;
    }
  };

  /**
   * Resetear el estado del hook
   */
  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    // Estado
    data,
    error,
    isLoading,

    // Funciones
    execute,
    reset,
  };
};
