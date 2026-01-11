import {useState, useEffect} from 'react'

export const useFormPersistence = (formKey, defaultValues = {}, ttl = 3600000) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(formKey)
      if (!saved) return defaultValues

      const {data, timestamp} = JSON.parse(saved)
      const isExpired = Date.now() - timestamp > ttl

      return isExpired ? defaultValues : data
    } catch (error) {
      console.error(`Error al cargar datos de ${formKey}:`, error)
      return defaultValues
    }
  })

  useEffect(() => {
    const saveToStorage = () => {
      try {
        if (Object.keys(formData).length > 0) {
          localStorage.setItem(
            formKey,
            JSON.stringify({
              data: formData,
              timestamp: Date.now(),
            }),
          )
        }
      } catch (error) {
        console.error(`Error al guardar datos de ${formKey}:`, error)
      }
    }

    const timeoutId = setTimeout(saveToStorage, 500)
    return () => clearTimeout(timeoutId)
  }, [formData, formKey])

  const saveFormData = (data) => {
    setFormData(data)
  }

  const clearFormData = () => {
    try {
      localStorage.removeItem(formKey)
      setFormData(defaultValues)
    } catch (error) {
      console.error(`Error al limpiar datos de ${formKey}:`, error)
    }
  }

  return {formData, saveFormData, clearFormData}
}
