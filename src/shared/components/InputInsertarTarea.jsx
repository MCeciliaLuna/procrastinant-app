import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import MicrofonoIcon from "@/assets/icons/microfono-icon.svg";
import CrearIcon from "@/assets/icons/crear-icon.svg";

function InputInsertarTarea() {
  return (
    <form className="flex bg-light rounded shadow mx-4 justify-between items-center p-2 w-[90vw]">
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="tarea"
        id="tarea"
        placeholder="Tarea"
      />
      <div className="flex gap-2 justify-around p-1">
        <BotonConIcono
          icon={MicrofonoIcon}
          className="ml-1 active:bg-orange rounded-4xl flex align-center justify-center w-10 h-10"
        />
        <BotonConIcono
          icon={CrearIcon}
          className="active:bg-orange rounded-4xl flex align-center justify-center w-10 h-10"
        />
      </div>
    </form>
  );
}
export default InputInsertarTarea;
