/**
 * Formulario de Tarea
 *
 * Formulario para crear y editar tareas con validación usando React Hook Form.
 * Puede ser utilizado tanto para crear nuevas tareas como para editar existentes.
 */

import { useForm } from "react-hook-form";
import { useTareasStore } from "../../../stores/tareasStore";
import { useToast } from "../../../hooks/useToast";
import * as tareasService from "../services/tareasService";
import { VALIDATION_MESSAGES } from "../../../config/constants";

/**
 * Componente de formulario de tarea
 * @param {Object} props - Props del componente
 * @param {Object} props.tarea - Tarea a editar (null para crear nueva)
 * @param {Function} props.onSuccess - Callback al guardar exitosamente
 */
export const TareaForm = ({ tarea = null, onSuccess }) => {
  const { addTarea, updateTarea } = useTareasStore();
  const { showSuccess, showError } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      descripcion: tarea?.descripcion || "",
    },
  });

  /**
   * Manejar envío del formulario
   */
  const onSubmit = async (data) => {
    try {
      if (tarea) {
        // Editar tarea existente
        const updatedTarea = await tareasService.updateTarea(
          tarea.id,
          data.descripcion
        );
        updateTarea(tarea.id, updatedTarea);
        showSuccess("Tarea actualizada exitosamente");
      } else {
        // Crear nueva tarea
        const newTarea = await tareasService.createTarea(data.descripcion);
        addTarea(newTarea);
        showSuccess("Tarea creada exitosamente");
        reset(); // Limpiar formulario después de crear
      }

      // Llamar callback si existe
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showError(error.message || "Error al guardar tarea");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tarea-form">
      {/* Descripción */}
      <div className="form-group">
        <label htmlFor="descripcion">
          {tarea ? "Editar Tarea" : "Nueva Tarea"}
        </label>
        <textarea
          id="descripcion"
          rows={3}
          placeholder="Descripción de la tarea..."
          {...register("descripcion", {
            required: VALIDATION_MESSAGES.required,
            maxLength: {
              value: 200,
              message: VALIDATION_MESSAGES.maxLength(200),
            },
          })}
          className={errors.descripcion ? "input-error" : ""}
        />
        {errors.descripcion && (
          <span className="error-message">{errors.descripcion.message}</span>
        )}
      </div>

      {/* Botones */}
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? "Guardando..." : tarea ? "Actualizar" : "Crear Tarea"}
        </button>

        {tarea && (
          <button
            type="button"
            onClick={() => {
              reset();
              if (onSuccess) onSuccess();
            }}
            className="btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
