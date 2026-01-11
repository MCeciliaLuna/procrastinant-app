import {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import BotonSimple from '@/shared/components/layout/BotonSimple'
import {useAuthStore} from '@/stores/authStore'
import {updateProfile} from '@/features/configuracion-usuario/services/userService'

function FormConfiguracionUsuario () {
  const {user, updateUser} = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    alias: '',
    email: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        alias: user.alias || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasChanges =
      formData.nombre !== user.nombre ||
      formData.apellido !== user.apellido ||
      formData.alias !== user.alias

    if (!hasChanges) {
      toast('No hay cambios para guardar', {icon: 'ℹ️'})
      return
    }

    const updates = {}
    if (formData.nombre !== user.nombre) updates.nombre = formData.nombre
    if (formData.apellido !== user.apellido) { updates.apellido = formData.apellido }
    if (formData.alias !== user.alias) updates.alias = formData.alias

    setIsLoading(true)

    try {
      const promise = updateProfile(updates)

      const result = await toast.promise(promise, {
        loading: 'Guardando cambios...',
        success: 'Perfil actualizado exitosamente',
        error: 'Error al actualizar perfil',
      })

      if (result.success && result.data?.user) {
        updateUser(result.data.user)
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150"
    >
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="nombre"
        id="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        autoComplete="given-name"
        aria-label="Nombre o nombres"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="apellido"
        id="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        autoComplete="family-name"
        aria-label="Apellido o apellidos"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="alias"
        id="alias"
        value={formData.alias}
        onChange={handleChange}
        placeholder="Alias"
        autoComplete="nickname"
        aria-label="Alias o apodo"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        name="email"
        id="email"
        value={formData.email}
        readOnly
        disabled
        autoComplete="email"
        aria-label="Correo electrónico (no editable)"
        title="El email no puede ser modificado"
      />
      <BotonSimple
        type="submit"
        disabled={isLoading}
        className={`bg-orange font-secondary p-3 rounded shadow-xl w-50 transition delay-50 duration-150 ease-in-out text-white ${
          isLoading
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:shadow-none active:bg-light'
        }`}
      >
        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
      </BotonSimple>
    </form>
  )
}
export default FormConfiguracionUsuario
