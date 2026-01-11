import {useState} from 'react'
import toast from 'react-hot-toast'
import BotonSimple from '@/shared/components/layout/BotonSimple'
import BotonConIcono from './layout/BotonConIcono'
import Modal from '@/shared/components/layout/Modal'
import VerContraseniaIcon from '@/assets/icons/visibilidad-on-icon.svg'
import OcultarContraseniaIcon from '@/assets/icons/visibilidad-off-icon.svg'
import {changePassword} from '@/features/configuracion-usuario/services/userService'

function FormCambioContraseña () {
  const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false)
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false)
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const toggleMostrarContrasenaActual = () => {
    setMostrarContrasenaActual(!mostrarContrasenaActual)
  }

  const toggleMostrarNuevaContrasena = () => {
    setMostrarNuevaContrasena(!mostrarNuevaContrasena)
  }

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Las contraseñas nuevas no coinciden')
      return
    }

    if (formData.newPassword.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return
    }

    setShowConfirmModal(true)
  }

  const handleConfirmChange = async () => {
    setShowConfirmModal(false)
    setIsLoading(true)

    try {
      const promise = changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword,
      )

      await toast.promise(promise, {
        loading: 'Cambiando contraseña...',
        success: 'Contraseña actualizada exitosamente',
        error: (err) => err.message || 'Error al cambiar contraseña',
      })

      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelChange = () => {
    setShowConfirmModal(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150 mb-5"
    >
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full bg-transparent"
          type={mostrarContrasenaActual ? 'text' : 'password'}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Contraseña actual"
          autoComplete="current-password"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarContrasenaActual
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarContrasenaActual}
          type="button"
        ></BotonConIcono>
      </div>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full bg-transparent"
          type={mostrarNuevaContrasena ? 'text' : 'password'}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Nueva contraseña"
          autoComplete="new-password"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarNuevaContrasena ? OcultarContraseniaIcon : VerContraseniaIcon
          }
          onClick={toggleMostrarNuevaContrasena}
          type="button"
        ></BotonConIcono>
      </div>
      <p className="text-xs text-dark/70 -mt-3 px-1 self-start">
        Mínimo 8 caracteres, 1 mayúscula y 1 número
      </p>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full bg-transparent"
          type={mostrarConfirmarContrasena ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
          autoComplete="new-password"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarConfirmarContrasena
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarConfirmarContrasena}
          type="button"
        ></BotonConIcono>
      </div>
      <BotonSimple
        type="submit"
        disabled={isLoading}
        className={`bg-orange font-secondary p-3 rounded shadow-xl w-50 transition delay-50 duration-150 ease-in-out text-white ${
          isLoading
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer hover:shadow-none active:bg-light'
        }`}
      >
        {isLoading ? 'Procesando...' : 'Cambiar Contraseña'}
      </BotonSimple>

      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelChange}
        title="Cambio de contraseña"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            ¿Estás segur@ que deseas cambiarla?
          </p>
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={handleCancelChange}
              disabled={isLoading}
              className={`bg-light font-secondary px-4 py-2 rounded shadow transition text-dark ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-none active:bg-lightsecondary'
              }`}
            >
              No
            </BotonSimple>
            <BotonSimple
              onClick={handleConfirmChange}
              disabled={isLoading}
              className={`bg-orange font-secondary px-4 py-2 rounded shadow transition text-white ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-none active:bg-lightsecondary'
              }`}
            >
              {isLoading ? 'Procesando...' : 'Sí'}
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </form>
  )
}
export default FormCambioContraseña
