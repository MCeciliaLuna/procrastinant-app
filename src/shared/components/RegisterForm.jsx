import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import BotonSimple from '@/shared/components/layout/BotonSimple'
import BotonConIcono from './layout/BotonConIcono'
import VerContraseniaIcon from '@/assets/icons/visibilidad-on-icon.svg'
import OcultarContraseniaIcon from '@/assets/icons/visibilidad-off-icon.svg'
import {register as registerService} from '@/features/autenticacion/services/authService'
import {useAuthStore} from '@/stores/authStore'
import {VALIDATION_MESSAGES, VALIDATION_PATTERNS} from '@/config/constants'

function RegisterForm () {
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false)
  const navigate = useNavigate()
  const loginStore = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena)
  }

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)
  }

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const promise = registerService({
        nombre: data.nombre,
        apellido: data.apellido,
        alias: data.alias,
        email: data.email,
        password: data.password,
      })

      const result = await toast.promise(promise, {
        loading: 'Creando cuenta...',
        success: '¡Cuenta creada exitosamente!',
        error: (err) => err.message || 'Error al registrarse',
      })

      if (result.success && result.data?.user) {
        loginStore(result.data.user)
        navigate('/dashboard', {replace: true})
      }
    } catch (err) {
      console.error('[RegisterForm] Error:', err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150"
    >
      <div className="w-full">
        <input
          className={`w-full bg-lightsecondary rounded h-10 font-secondary p-3 ${
            errors.nombre ? 'border-2 border-red-500' : ''
          }`}
          type="text"
          id="nombre"
          placeholder="Nombre/s"
          autoComplete="given-name"
          aria-label="Nombre o nombres"
          aria-invalid={errors.nombre ? 'true' : 'false'}
          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          {...register('nombre', {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.ONLY_LETTERS,
              message: VALIDATION_MESSAGES.onlyLetters,
            },
            setValueAs: (value) => value.trim(),
          })}
        />
        {errors.nombre && (
          <span
            id="nombre-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.nombre.message}
          </span>
        )}
      </div>

      <div className="w-full">
        <input
          className={`w-full bg-lightsecondary rounded h-10 font-secondary p-3 ${
            errors.apellido ? 'border-2 border-red-500' : ''
          }`}
          type="text"
          id="apellido"
          placeholder="Apellido/s"
          autoComplete="family-name"
          aria-label="Apellido o apellidos"
          aria-invalid={errors.apellido ? 'true' : 'false'}
          aria-describedby={errors.apellido ? 'apellido-error' : undefined}
          {...register('apellido', {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.ONLY_LETTERS,
              message: VALIDATION_MESSAGES.onlyLetters,
            },
            setValueAs: (value) => value.trim(),
          })}
        />
        {errors.apellido && (
          <span
            id="apellido-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.apellido.message}
          </span>
        )}
      </div>

      <div className="w-full">
        <input
          className={`w-full bg-lightsecondary rounded h-10 font-secondary p-3 ${
            errors.alias ? 'border-2 border-red-500' : ''
          }`}
          type="text"
          id="alias"
          placeholder="Alias"
          autoComplete="nickname"
          aria-label="Alias o apodo"
          aria-invalid={errors.alias ? 'true' : 'false'}
          aria-describedby={errors.alias ? 'alias-error' : undefined}
          {...register('alias', {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.ALPHANUMERIC,
              message: VALIDATION_MESSAGES.alphanumeric,
            },
            setValueAs: (value) => value.trim(),
          })}
        />
        {errors.alias && (
          <span
            id="alias-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.alias.message}
          </span>
        )}
      </div>

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
            autoComplete="new-password"
            aria-label="Contraseña"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={
              errors.password ? 'password-error' : 'password-requirements'
            }
            {...register('password', {
              required: VALIDATION_MESSAGES.required,
              pattern: {
                value: VALIDATION_PATTERNS.PASSWORD,
                message: VALIDATION_MESSAGES.password,
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
        {errors.password
          ? (
            <span
              id="password-error"
              className="text-red-500 text-sm mt-1 block px-1"
            >
              {errors.password.message}
            </span>
          )
          : (
            <p
              id="password-requirements"
              className="text-xs text-dark/70 mt-1 px-1"
            >
            Mínimo 8 caracteres, 1 mayúscula y 1 número
            </p>
          )}
      </div>

      <div className="w-full">
        <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
          <input
            className="w-full bg-transparent outline-none"
            type={mostrarConfirmarContrasena ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Confirmar contraseña"
            autoComplete="new-password"
            aria-label="Confirmar contraseña"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={
              errors.confirmPassword ? 'confirm-password-error' : undefined
            }
            {...register('confirmPassword', {
              required: VALIDATION_MESSAGES.required,
              validate: (value) =>
                value === password || VALIDATION_MESSAGES.passwordMatch,
            })}
          />
          <BotonConIcono
            className="ml-2 cursor-pointer"
            icon={
              mostrarConfirmarContrasena
                ? OcultarContraseniaIcon
                : VerContraseniaIcon
            }
            onClick={toggleMostrarConfirmarContrasena}
            aria-label={
              mostrarConfirmarContrasena
                ? 'Ocultar confirmación de contraseña'
                : 'Mostrar confirmación de contraseña'
            }
            type="button"
          />
        </div>
        {errors.confirmPassword && (
          <span
            id="confirm-password-error"
            className="text-red-500 text-sm mt-1 block px-1"
          >
            {errors.confirmPassword.message}
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
        {isSubmitting ? 'Cargando...' : 'Registrarse'}
      </BotonSimple>
    </form>
  )
}
export default RegisterForm
