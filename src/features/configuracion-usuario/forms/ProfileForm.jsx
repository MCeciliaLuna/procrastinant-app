/**
 * Formulario de Perfil de Usuario
 *
 * Formulario para actualizar el perfil del usuario.
 * Incluye validaciones para nombre, apellido, alias y email.
 */

import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import * as userService from "../services/userService";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../../config/constants";

/**
 * Componente de formulario de perfil
 */
export const ProfileForm = () => {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      alias: user.alias || "",
      email: user.email || "",
    },
  });

  // Observar cambios en el email
  const currentEmail = watch("email");
  const emailChanged = currentEmail !== user.email;

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data) => {
    try {
      const response = await userService.updateProfile(data);

      if (response.success) {
        updateUser(data);
        showSuccess("Perfil actualizado exitosamente");

        // Si el email cambió, informar sobre confirmación
        if (emailChanged) {
          showInfo(
            "Se ha enviado un correo de confirmación a tu nueva dirección"
          );
        }
      }
    } catch (error) {
      showError(error.message || "Error al actualizar perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
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
        {emailChanged && (
          <span className="info-message">
            Se enviará un correo de confirmación a la nueva dirección
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Guardando..." : "Guardar Cambios"}
      </button>
    </form>
  );
};
