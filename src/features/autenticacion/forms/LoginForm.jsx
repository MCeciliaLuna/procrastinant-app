/**
 * Formulario de Login
 *
 * Formulario de inicio de sesión con validación usando React Hook Form.
 * Incluye validaciones para email y contraseña.
 */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../../config/constants";

/**
 * Componente de formulario de login
 */
export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data) => {
    const success = await login(data.email, data.password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
          })}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
};
