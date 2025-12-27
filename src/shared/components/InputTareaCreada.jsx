import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import CheckIcono from "@/assets/icons/check-icon.svg";
import TrashIcono from "@/assets/icons/trash-icon.svg";

function InputTareaCreada() {
  return (
    <div className="flex bg-light rounded shadow mx-4 justify-between items-center p-2 w-[90vw] md:w-150 mt-2">
      <input
        className="w-full bg-light rounded h-10 font-secondary p-3 focus:bg-lightsecondary"
        type="text"
        name="tarea"
        id="tarea"
        defaultValue="Tarea creada"
      />{" "}
      <div className="flex gap-2 justify-around p-1">
        <BotonConIcono
          className="ml-1 active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 cursor-pointer hover:bg-lightsecondary"
          icon={CheckIcono}
        />
        <BotonConIcono
          className="active:bg-lightsecondary rounded-4xl flex align-center justify-center w-10 h-10 cursor-pointer hover:bg-lightsecondary"
          icon={TrashIcono}
        />
      </div>
    </div>
  );
}
export default InputTareaCreada;
