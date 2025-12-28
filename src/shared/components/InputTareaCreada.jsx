import { useState } from "react";
import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import CheckIcono from "@/assets/icons/check-icon.svg";
import TrashIcono from "@/assets/icons/trash-icon.svg";
import DragIcono from "@/assets/icons/drag-icon.svg";

function InputTareaCreada({
  defaultValue = "Tarea creada",
  onSave,
  onDelete,
  onComplete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleBlur = () => {
    setIsEditing(false);
    if (onSave && value !== defaultValue) {
      onSave(value);
    }
  };

  return (
    <div className="flex bg-light rounded shadow mx-4 justify-between items-center p-2 w-[90vw] md:w-150 mt-2">
      <input
        className={`w-full bg-light rounded h-10 font-secondary p-3 ${
          isEditing ? "focus:bg-lightsecondary" : "cursor-default"
        }`}
        type="text"
        name="tarea"
        id="tarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={handleBlur}
        aria-label="Nombre de la tarea"
      />{" "}
      <div className="flex gap-2 justify-around p-1">
        <BotonConIcono
          className="ml-1 active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 cursor-pointer hover:bg-lightsecondary"
          icon={CheckIcono}
          onClick={onComplete}
          aria-label="Marcar como completada"
          type="button"
        />
        <BotonConIcono
          className="active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 cursor-pointer hover:bg-lightsecondary"
          icon={TrashIcono}
          onClick={onDelete}
          aria-label="Eliminar tarea"
          type="button"
        />
        <BotonConIcono
          className="active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 cursor-pointer hover:bg-lightsecondary"
          icon={DragIcono}
          aria-label="Arrastrar para reordenar"
          type="button"
        />
      </div>
    </div>
  );
}
export default InputTareaCreada;
