/**
 * Formulario de Registro
 *
 * Formulario de registro de usuario con validación completa usando React Hook Form.
 * Incluye validaciones para nombre, apellido, alias, email y contraseñas.
 */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../../config/constants";

/**
 * Componente de formulario de registro
 */
export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Observar el valor de password para validar confirmación
  const password = watch("password");

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data) => {
    const { confirmPassword, ...userData } = data;
    const success = await registerUser(userData);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      {/* Nombre */}
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          {...register("nombre", {
            required: VALIDATION_MESSAGES.required,
            minLength: {
              value: 2,
              message: VALIDATION_MESSAGES.minLength(2),
            },
            pattern: {
              value: VALIDATION_PATTERNS.ONLY_LETTERS,
              message: VALIDATION_MESSAGES.onlyLetters,
            },
          })}
          className={errors.nombre ? "input-error" : ""}
        />
        {errors.nombre && (
          <span className="error-message">{errors.nombre.message}</span>
        )}
      </div>

      {/* Apellido */}
      <div className="form-group">
        <label htmlFor="apellido">Apellido</label>
        <input
          type="text"
          id="apellido"
          {...register("apellido", {
            required: VALIDATION_MESSAGES.required,
            minLength: {
              value: 2,
              message: VALIDATION_MESSAGES.minLength(2),
            },
            pattern: {
              value: VALIDATION_PATTERNS.ONLY_LETTERS,
              message: VALIDATION_MESSAGES.onlyLetters,
            },
          })}
          className={errors.apellido ? "input-error" : ""}
        />
        {errors.apellido && (
          <span className="error-message">{errors.apellido.message}</span>
        )}
      </div>

      {/* Alias (Opcional) */}
      <div className="form-group">
        <label htmlFor="alias">Alias (Opcional)</label>
        <input
          type="text"
          id="alias"
          {...register("alias", {
            minLength: {
              value: 3,
              message: VALIDATION_MESSAGES.minLength(3),
            },
            maxLength: {
              value: 20,
              message: VALIDATION_MESSAGES.maxLength(20),
            },
            pattern: {
              value: VALIDATION_PATTERNS.ALPHANUMERIC,
              message: VALIDATION_MESSAGES.alphanumeric,
            },
          })}
          className={errors.alias ? "input-error" : ""}
        />
        {errors.alias && (
          <span className="error-message">{errors.alias.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.EMAIL,
              message: VALIDATION_MESSAGES.email,
            },
          })}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.PASSWORD,
              message: VALIDATION_MESSAGES.password,
            },
          })}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: VALIDATION_MESSAGES.required,
            validate: (value) =>
              value === password || VALIDATION_MESSAGES.passwordMatch,
          })}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};
