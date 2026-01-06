import BotonSimple from "./BotonSimple";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { logout as logoutService } from "@/features/autenticacion/services/authService";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { useState } from "react";

const BotonCerrarSesión = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const promise = logoutService();

      await toast.promise(promise, {
        loading: "Cerrando sesión...",
        success: "Sesión cerrada exitosamente",
        error: "Error al cerrar sesión",
      });

      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      logout();
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setShowConfirmModal(true)}
        className="bg-orange font-secondary p-3 rounded shadow-xl w-full cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Cerrar Sesión
      </button>
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Cerrar Sesión"
      >
        <div className="flex flex-col gap-4">
          <p className="font-secondary text-dark">
            ¿Estás segur@ que quieres cerrar tu sesión?
          </p>
          <div className="flex gap-3 justify-end">
            <BotonSimple
              onClick={() => setShowConfirmModal(false)}
              disabled={isLoading}
              className={`bg-light font-secondary px-4 py-2 rounded shadow transition text-dark ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-none active:bg-lightsecondary"
              }`}
            >
              No
            </BotonSimple>
            <BotonSimple
              onClick={handleLogout}
              disabled={isLoading}
              className={`bg-orange font-secondary px-4 py-2 rounded shadow transition text-white ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-none active:bg-lightsecondary"
              }`}
            >
              {isLoading ? "Cerrando..." : "Sí"}
            </BotonSimple>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BotonCerrarSesión;
