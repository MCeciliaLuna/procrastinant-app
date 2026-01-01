import { useState } from "react";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import BotonConIcono from "./layout/BotonConIcono";
import Modal from "@/shared/components/layout/Modal";
import VerContraseniaIcon from "@/assets/icons/visibilidad-on-icon.svg";
import OcultarContraseniaIcon from "@/assets/icons/visibilidad-off-icon.svg";

function FormCambioContraseña() {
  const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleMostrarContrasenaActual = () => {
    setMostrarContrasenaActual(!mostrarContrasenaActual);
  };

  const toggleMostrarNuevaContrasena = () => {
    setMostrarNuevaContrasena(!mostrarNuevaContrasena);
  };

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
  };

  const handleChangePassword = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmChange = () => {
    // Funcionalidad de cambio de contraseña pendiente
    setShowConfirmModal(false);
  };

  const handleCancelChange = () => {
    setShowConfirmModal(false);
  };

  return (
    <form className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150 mb-5">
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarContrasenaActual ? "text" : "password"}
          placeholder="Contraseña actual"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarContrasenaActual
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarContrasenaActual}
        ></BotonConIcono>
      </div>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarNuevaContrasena ? "text" : "password"}
          placeholder="Nueva contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarNuevaContrasena ? OcultarContraseniaIcon : VerContraseniaIcon
          }
          onClick={toggleMostrarNuevaContrasena}
        ></BotonConIcono>
      </div>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarConfirmarContrasena ? "text" : "password"}
          placeholder="Confirmar contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarConfirmarContrasena
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarConfirmarContrasena}
        ></BotonConIcono>
      </div>
      <BotonSimple
        onClick={handleChangePassword}
        className="bg-orange font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Cambiar Contraseña
      </BotonSimple>

      <Modal
        isOpen={showConfirmModal}
        onClose={handleCancelChange}
        title="Cambio de contraseña"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            ¿Estás segur@ que deseas cambiarla?
          </p>
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={handleCancelChange}
              className="bg-light font-secondary px-4 py-2 rounded shadow hover:shadow-none transition text-dark active:bg-lightsecondary"
            >
              No
            </BotonSimple>
            <BotonSimple
              onClick={handleConfirmChange}
              className="bg-orange font-secondary px-4 py-2 rounded shadow hover:shadow-none transition text-white active:bg-lightsecondary"
            >
              Sí
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </form>
  );
}
export default FormCambioContraseña;
