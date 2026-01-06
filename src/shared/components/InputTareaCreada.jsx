import { useState, useEffect } from "react";
import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import Modal from "@/shared/components/layout/Modal";
import CheckIcono from "@/assets/icons/check-icon.svg";
import TrashIcono from "@/assets/icons/trash-icon.svg";

function InputTareaCreada({ tarea, onUpdate, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(tarea.descripcion);
  const [isCompleted, setIsCompleted] = useState(tarea.listo || false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isTogglingTask, setIsTogglingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  useEffect(() => {
    setValue(tarea.descripcion);
    setIsCompleted(tarea.listo || false);
  }, [tarea]);

  const handleBlur = () => {
    setIsEditing(false);

    if (value.trim() && value !== tarea.descripcion) {
      onUpdate(tarea.id, { descripcion: value.trim() });
    } else if (!value.trim()) {
      setValue(tarea.descripcion);
    }
  };

  const handleComplete = async () => {
    setIsTogglingTask(true);
    try {
      await onToggle(tarea.id, isCompleted);
    } finally {
      setIsTogglingTask(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    setIsDeletingTask(true);
    try {
      await onDelete(tarea.id);
    } finally {
      setIsDeletingTask(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`flex rounded shadow mx-4 justify-between items-center p-2 w-[90vw] md:w-150 mt-2 ${
          isCompleted ? "bg-orange" : "bg-light"
        } ${isEditing ? "focus:bg-lightsecondary" : "cursor-default"}`}
      >
        <input
          className={`w-full rounded h-10 font-secondary p-3 ${
            isCompleted ? "bg-orange line-through" : "bg-light"
          } ${isEditing ? "focus:bg-lightsecondary" : "cursor-default"}`}
          type="text"
          name="tarea"
          id={`tarea-${tarea.id}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.blur();
            }
          }}
          aria-label="Nombre de la tarea"
        />{" "}
        <div className="flex gap-2 justify-around p-1">
          <BotonConIcono
            className={`ml-1 rounded-4xl flex align-center justify-center w-10 h-10 ${
              isTogglingTask
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer active:bg-lightsecondary hover:bg-orange"
            }`}
            icon={CheckIcono}
            onClick={handleComplete}
            disabled={isTogglingTask}
            aria-label="Marcar como completada"
            type="button"
          />
          <BotonConIcono
            className={`rounded-4xl flex align-center justify-center w-10 h-10 ${
              isDeletingTask
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer active:bg-red-300 hover:bg-red-500"
            }`}
            icon={TrashIcono}
            onClick={handleDeleteClick}
            disabled={isDeletingTask || showDeleteModal}
            aria-label="Eliminar tarea"
            type="button"
          />
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Eliminar tarea"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            ¿Estás segur@ que deseas eliminarla?
          </p>
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={handleCancelDelete}
              className="bg-light font-secondary px-4 py-2 rounded shadow hover:shadow-none transition text-dark active:bg-lightsecondary"
            >
              No
            </BotonSimple>
            <BotonSimple
              onClick={handleConfirmDelete}
              className="bg-red-500 text-white font-secondary px-4 py-2 rounded shadow hover:shadow-none transition active:text-dark active:bg-lightsecondary"
            >
              Sí
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default InputTareaCreada;
