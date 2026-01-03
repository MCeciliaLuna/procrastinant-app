import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Title from "@/shared/components/layout/Title";
import InputInsertarTarea from "@/shared/components/InputInsertarTarea";
import InputTareaCreada from "@/shared/components/InputTareaCreada";
import { useAuthStore } from "@/stores/authStore";
import { useTareasStore } from "@/stores/tareasStore";
import {
  getTareas,
  createTarea,
  updateTarea,
  toggleTarea,
  deleteTarea,
} from "../services/tareasService";

function PaginaDashboard() {
  const { user } = useAuthStore();
  const {
    tareas,
    setTareas,
    addTarea,
    updateTarea: updateTareaStore,
    deleteTarea: deleteTareaStore,
  } = useTareasStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const tareasData = await getTareas();
        setTareas(tareasData);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
        toast.error("Error al cargar tus tareas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTareas();
  }, [setTareas]);

  const handleCreateTarea = async (descripcion) => {
    try {
      const promise = createTarea(descripcion);

      const nuevaTarea = await toast.promise(promise, {
        loading: "Creando tarea...",
        success: "Tarea creada exitosamente",
        error: "Error al crear tarea",
      });

      if (nuevaTarea) {
        addTarea(nuevaTarea);
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const handleUpdateTarea = async (id, updates) => {
    try {
      const tareaActualizada = await updateTarea(id, updates);
      if (tareaActualizada) {
        updateTareaStore(id, tareaActualizada);
        toast.success("Tarea actualizada");
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      toast.error("Error al actualizar tarea");
    }
  };

  const handleToggleTarea = async (id, currentStatus) => {
    try {
      const tareaActualizada = await toggleTarea(id);
      if (tareaActualizada) {
        updateTareaStore(id, tareaActualizada);
        toast.success(
          tareaActualizada.listo ? "¡Tarea completada! 🎉" : "Tarea pendiente"
        );
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast.error("Error al cambiar estado de tarea");
    }
  };

  const handleDeleteTarea = async (id) => {
    try {
      await deleteTarea(id);
      deleteTareaStore(id);
      toast.success("Tarea eliminada");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      toast.error("Error al eliminar tarea");
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center">
      <section aria-labelledby="dashboard-title">
        <Title
          id="dashboard-title"
          level={1}
          className="text-center text-shadow-xs text-shadow-white font-primary text-[2.5em] text-orange py-5 mt-5"
        >
          Hola! {user?.alias || user?.nombre || "Usuario"}
        </Title>

        <InputInsertarTarea onCreate={handleCreateTarea} />

        {isLoading ? (
          <div className="flex justify-center mt-8">
            <div className="spinner" aria-hidden="true"></div>
            <span className="sr-only">Cargando tareas...</span>
          </div>
        ) : tareas.length === 0 ? (
          <p className="text-center text-dark/70 mt-8 font-secondary">
            No tienes tareas aún. ¡Crea tu primera tarea arriba!
          </p>
        ) : (
          tareas.map((tarea) => (
            <InputTareaCreada
              key={tarea.id}
              tarea={tarea}
              onUpdate={handleUpdateTarea}
              onToggle={handleToggleTarea}
              onDelete={handleDeleteTarea}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default PaginaDashboard;
