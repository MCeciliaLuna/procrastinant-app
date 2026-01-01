import { useState } from "react";import BotonConIcono from "@/shared/components/layout/BotonConIcono";
import Modal from "@/shared/components/layout/Modal";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import DangerIcono from "@/assets/icons/peligro-white-icon.svg";

const BotonEliminarCuenta = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmText === "ELIMINAR") {
      // Funcionalidad de eliminación pendiente
      setShowDeleteModal(false);
      setDeleteConfirmText("");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
  };
  return (
    <>
      <BotonConIcono
        icon={DangerIcono}
        text="Cerrar sesión"
        className="bg-red-500 font-bold font-secondary p-3 rounded shadow-xl w-50 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
        aria-label="Eliminar cuenta"
        type="button"
        onClick={handleDeleteAccount}
      >
        Eliminar cuenta
      </BotonConIcono>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Eliminar mi cuenta"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            Esta acción es irreversible. Para confirmarla, escribe{" "}
            <strong>ELIMINAR</strong> abajo:
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
            placeholder="Escribe ELIMINAR"
            aria-label="Confirmación de eliminación"
          />
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={handleCancelDelete}
              className="bg-light font-secondary px-4 py-2 rounded shadow hover:shadow-none transition text-dark active:bg-lightsecondary"
            >
              Cancelar
            </BotonSimple>
            <BotonSimple
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== "ELIMINAR"}
              className={`font-secondary px-4 py-2 rounded shadow transition text-white ${
                deleteConfirmText === "ELIMINAR"
                  ? "bg-red-500 hover:shadow-none cursor-pointer active:bg-orange"
                  : "bg-red-300 cursor-not-allowed text-dark"
              }`}
            >
              Confirmar
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BotonEliminarCuenta;
