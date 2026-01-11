import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import BotonConIcono from '@/shared/components/layout/BotonConIcono'
import Modal from '@/shared/components/layout/Modal'
import BotonSimple from '@/shared/components/layout/BotonSimple'
import VerContraseniaIcon from '@/assets/icons/visibilidad-on-icon.svg'
import OcultarContraseniaIcon from '@/assets/icons/visibilidad-off-icon.svg'
import DangerIcono from '@/assets/icons/peligro-white-icon.svg'
import {useAuthStore} from '@/stores/authStore'
import {deleteAccount} from '@/features/configuracion-usuario/services/userService'

const BotonEliminarCuenta = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== 'ELIMINAR') {
      toast.error('Debes escribir "ELIMINAR" para confirmar')
      return
    }

    if (!password) {
      toast.error('Debes ingresar tu contraseña')
      return
    }

    setIsDeleting(true)

    try {
      const promise = deleteAccount(password)

      await toast.promise(promise, {
        loading: 'Eliminando cuenta...',
        success: 'Cuenta eliminada exitosamente',
        error: (err) => err.message || 'Error al eliminar cuenta',
      })

      setShowDeleteModal(false)
      setDeleteConfirmText('')
      setPassword('')

      logout()
      navigate('/')
    } catch (error) {
      console.error('Error al eliminar cuenta:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setDeleteConfirmText('')
    setPassword('')
  }

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena)
  }

  return (
    <>
      <BotonConIcono
        icon={DangerIcono}
        text="Eliminar cuenta"
        className="bg-red-500 font-bold font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
        aria-label="Eliminar cuenta"
        type="button"
        onClick={handleDeleteAccount}
      >
        Eliminar cuenta
      </BotonConIcono>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Eliminar mi cuenta"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            Esta acción es irreversible. Para confirmarla, escribe{' '}
            <strong>ELIMINAR</strong> abajo y tu contraseña:
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
            placeholder="Escribe ELIMINAR"
            aria-label="Confirmación de eliminación"
          />
          <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
            <input
              className="w-full bg-transparent outline-none"
              type={mostrarContrasena ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              autoComplete="current-password"
              aria-label="Contraseña actual"
            />
            <button
              type="button"
              className="ml-2 cursor-pointer shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleMostrarContrasena()
              }}
              aria-label="Mostrar/Ocultar contraseña"
            >
              <img
                src={
                  mostrarContrasena
                    ? OcultarContraseniaIcon
                    : VerContraseniaIcon
                }
                alt=""
                className="w-5 h-5"
              />
            </button>
          </div>
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className={`bg-light font-secondary px-4 py-2 rounded shadow transition text-dark ${
                isDeleting
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-none active:bg-lightsecondary'
              }`}
            >
              Cancelar
            </BotonSimple>
            <BotonSimple
              onClick={handleConfirmDelete}
              disabled={
                deleteConfirmText !== 'ELIMINAR' || !password || isDeleting
              }
              className={`font-secondary px-4 py-2 rounded shadow transition text-white ${
                deleteConfirmText === 'ELIMINAR' && password && !isDeleting
                  ? 'bg-red-500 hover:shadow-none cursor-pointer active:bg-orange'
                  : 'bg-red-300 cursor-not-allowed text-dark opacity-50'
              }`}
            >
              {isDeleting ? 'Eliminando...' : 'Confirmar'}
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default BotonEliminarCuenta
