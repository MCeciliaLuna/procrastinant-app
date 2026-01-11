import {useState} from 'react'

export const useApi = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = async (apiFunction, ...args) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await apiFunction(...args)

      setData(result)
      setIsLoading(false)

      return result
    } catch (err) {
      setError(err.message || 'Error en la petición')
      setIsLoading(false)
      throw err
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }

  return {
    data,
    error,
    isLoading,

    execute,
    reset,
  }
}
