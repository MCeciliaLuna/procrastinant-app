/**
 * Formulario de Cambio de Contraseña
 *
 * Formulario para cambiar la contraseña del usuario.
 * Incluye validaciones para contraseña actual, nueva contraseña y confirmación.
 */

import { useForm } from "react-hook-form";
import { useToast } from "../../../hooks/useToast";
import * as userService from "../services/userService";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../../config/constants";

/**
 * Componente de formulario de cambio de contraseña
 */
export const PasswordForm = () => {
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Observar el valor de newPassword para validar confirmación
  const newPassword = watch("newPassword");

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data) => {
    try {
      const response = await userService.changePassword(
        data.currentPassword,
        data.newPassword
      );

      if (response.success) {
        showSuccess("Contraseña actualizada exitosamente");
        reset(); // Limpiar formulario
      }
    } catch (error) {
      showError(error.message || "Error al cambiar contraseña");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="password-form">
      {/* Contraseña Actual */}
      <div className="form-group">
        <label htmlFor="currentPassword">Contraseña Actual</label>
        <input
          type="password"
          id="currentPassword"
          {...register("currentPassword", {
            required: VALIDATION_MESSAGES.required,
          })}
          className={errors.currentPassword ? "input-error" : ""}
        />
        {errors.currentPassword && (
          <span className="error-message">
            {errors.currentPassword.message}
          </span>
        )}
      </div>

      {/* Nueva Contraseña */}
      <div className="form-group">
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <input
          type="password"
          id="newPassword"
          {...register("newPassword", {
            required: VALIDATION_MESSAGES.required,
            pattern: {
              value: VALIDATION_PATTERNS.PASSWORD,
              message: VALIDATION_MESSAGES.password,
            },
          })}
          className={errors.newPassword ? "input-error" : ""}
        />
        {errors.newPassword && (
          <span className="error-message">{errors.newPassword.message}</span>
        )}
        <span className="help-text">
          Debe tener al menos 8 caracteres, una mayúscula y un número
        </span>
      </div>

      {/* Confirmar Nueva Contraseña */}
      <div className="form-group">
        <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          id="confirmNewPassword"
          {...register("confirmNewPassword", {
            required: VALIDATION_MESSAGES.required,
            validate: (value) =>
              value === newPassword || VALIDATION_MESSAGES.passwordMatch,
          })}
          className={errors.confirmNewPassword ? "input-error" : ""}
        />
        {errors.confirmNewPassword && (
          <span className="error-message">
            {errors.confirmNewPassword.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Actualizando..." : "Cambiar Contraseña"}
      </button>
    </form>
  );
};
