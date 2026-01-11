import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import BotonSimple from '@/shared/components/layout/BotonSimple'
import VerContraseniaIcon from '@/assets/icons/visibilidad-on-icon.svg'
import OcultarContraseniaIcon from '@/assets/icons/visibilidad-off-icon.svg'
import BotonConIcono from './layout/BotonConIcono'
import ErrorDisplay from './layout/ErrorDisplay'
import {login} from '@/features/autenticacion/services/authService'
import {useAuthStore} from '@/stores/authStore'
import {useFormPersistence} from '@/hooks/useFormPersistence'
import {getErrorMessage} from '@/utils/errorMessages'
import {VALIDATION_MESSAGES, VALIDATION_PATTERNS} from '@/config/constants'

function LoginForm () {
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [backendError, setBackendError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const loginStore = useAuthStore((state) => state.login)
  const {formData, saveFormData, clearFormData} = useFormPersistence(
    'login-form',
    {email: ''},
    3600000,
  )

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: formData,
  })

  useEffect(() => {
    if (formData.email) {
      setValue('email', formData.email)
    }
  }, [])

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena)
  }

  const onSubmit = async (data) => {
    setBackendError(null)
    saveFormData({email: data.email})

    try {
      const result = await login(data.email, data.password)

      if (result.success && result.data?.user) {
        loginStore(result.data.user)
        clearFormData()
        toast.success('¡Bienvenid@ a Procrastinant!')
        const from = location.state?.from?.pathname || '/dashboard'
        navigate(from, {replace: true})
      } else {
        const errorInfo = getErrorMessage(
          result.message || 'Error al iniciar sesión',
          'auth',
        )
        setBackendError(errorInfo)
      }
    } catch (err) {
      console.error('[LoginForm] Error en handleSubmit:', err)
      const errorInfo = getErrorMessage(
        err.message || 'Error de conexión',
        'auth',
      )
      setBackendError(errorInfo)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 h-50 justify-center items-center px-5 w-[90vw] md:w-150"
    >
      {backendError && (
        <ErrorDisplay
          error={backendError}
          onClear={() => setBackendError(null)}
        />
      )}
      <div className="w-full">
        <input
          className={`w-full bg-lightsecondary rounded h-10 font-secondary p-3 ${
            errors.email ? 'border-2 border-red-500' : ''
          }`}
          type="email"
          id="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          aria-label="Correo electrónico"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.EMAIL,
              message: VALIDATION_MESSAGES.email,
            },
            setValueAs: (value) => value.toLowerCase().trim(),
          })}
        />
        {errors.email && (
          <span
            id="email-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="w-full">
        <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
          <input
            className="w-full bg-transparent outline-none"
            type={mostrarContrasena ? 'text' : 'password'}
            id="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            aria-label="Contraseña"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password', {
              required: VALIDATION_MESSAGES.required,
              minLength: {
                value: 8,
                message: VALIDATION_MESSAGES.minLength(8),
              },
            })}
          />
          <BotonConIcono
            className="ml-2 cursor-pointer"
            icon={
              mostrarContrasena ? OcultarContraseniaIcon : VerContraseniaIcon
            }
            onClick={toggleMostrarContrasena}
            aria-label={
              mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            type="button"
          />
        </div>
        {errors.password && (
          <span
            id="password-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.password.message}
          </span>
        )}
      </div>

      <BotonSimple
        type="submit"
        disabled={isSubmitting}
        className={`bg-orange font-secondary p-3 rounded shadow-xl w-40 transition delay-50 
          duration-150 ease-in-out text-white ${
    isSubmitting
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:shadow-none active:bg-light'
    }`}
      >
        {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
      </BotonSimple>
    </form>
  )
}
export default LoginForm
