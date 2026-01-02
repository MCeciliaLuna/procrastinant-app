import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import VerContraseniaIcon from "@/assets/icons/visibilidad-on-icon.svg";
import OcultarContraseniaIcon from "@/assets/icons/visibilidad-off-icon.svg";
import BotonConIcono from "./layout/BotonConIcono";
import { login } from "@/features/autenticacion/services/authService";
import { useAuthStore } from "@/stores/authStore";

function LoginForm() {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await login(email, password);

      console.log("[LoginForm] Respuesta completa del login:", result);
      console.log("[LoginForm] result.success:", result.success);
      console.log("[LoginForm] result.data:", result.data);
      console.log("[LoginForm] result.data?.token:", result.data?.token);
      console.log("[LoginForm] result.data?.user:", result.data?.user);

      if (result.success && result.data?.user) {
        console.log("[LoginForm] Condición exitosa, llamando loginStore...");
        loginStore(result.data.user);
        console.log("[LoginForm] loginStore ejecutado, mostrando toast...");
        toast.success("Inicio de sesión exitoso");
        console.log("[LoginForm] Toast mostrado, navegando a dashboard...");
        navigate("/dashboard");
        console.log("[LoginForm] Navigate ejecutado");
      } else {
        const errorMsg = result.message || "Error al iniciar sesión";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      console.error("[LoginForm] Error en handleSubmit:", err);
      const errorMsg = err.message || "Error al conectar con el servidor";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 h-50 justify-center items-center px-5 w-[90vw] md:w-150"
    >
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico"
        required
        autoComplete="email"
        aria-label="Correo electrónico"
      />
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarContrasena ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Contraseña"
          required
          minLength="8"
          autoComplete="current-password"
          aria-label="Contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={mostrarContrasena ? OcultarContraseniaIcon : VerContraseniaIcon}
          onClick={toggleMostrarContrasena}
          aria-label={
            mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
          }
          type="button"
        ></BotonConIcono>
      </div>
      <BotonSimple
        type="submit"
        className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Iniciar Sesión
      </BotonSimple>
    </form>
  );
}
export default LoginForm;
