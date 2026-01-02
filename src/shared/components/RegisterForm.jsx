import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BotonSimple from "@/shared/components/layout/BotonSimple";
import BotonConIcono from "./layout/BotonConIcono";
import VerContraseniaIcon from "@/assets/icons/visibilidad-on-icon.svg";
import OcultarContraseniaIcon from "@/assets/icons/visibilidad-off-icon.svg";
import { register } from "@/features/autenticacion/services/authService";
import { useAuthStore } from "@/stores/authStore";

function RegisterForm() {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] =
    useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const toggleMostrarConfirmarContrasena = () => {
    setMostrarConfirmarContrasena(!mostrarConfirmarContrasena);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const alias = formData.get("alias");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await register({
        nombre,
        apellido,
        alias,
        email,
        password,
      });

      if (result.success && result.data?.user) {
        loginStore(result.data.user);
        toast.success("Registro exitoso");
        navigate("/dashboard");
      } else {
        const errorMsg = result.message || "Error al registrarse";
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      const errorMsg = err.message || "Error al conectar con el servidor";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-light rounded shadow mx-4 py-5 justify-center items-center px-5 w-[90vw] md:w-150"
    >
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre/s"
        required
        autoComplete="given-name"
        aria-label="Nombre o nombres"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="apellido"
        id="apellido"
        placeholder="Apellido/s"
        required
        autoComplete="family-name"
        aria-label="Apellido o apellidos"
      />
      <input
        className="w-full bg-lightsecondary rounded h-10 font-secondary p-3"
        type="text"
        name="alias"
        id="alias"
        placeholder="Alias"
        required
        autoComplete="nickname"
        aria-label="Alias o apodo"
      />
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
      <div className="w-full">
        <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
          <input
            className="w-full"
            type={mostrarContrasena ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Contraseña"
            required
            minLength="8"
            autoComplete="new-password"
            aria-label="Contraseña"
            aria-describedby="password-requirements"
          />
          <BotonConIcono
            className="ml-2 cursor-pointer"
            icon={
              mostrarContrasena ? OcultarContraseniaIcon : VerContraseniaIcon
            }
            onClick={toggleMostrarContrasena}
            aria-label={
              mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            type="button"
          ></BotonConIcono>
        </div>
        <p
          id="password-requirements"
          className="text-xs text-dark/70 mt-1 px-1"
        >
          Mínimo 8 caracteres, 1 mayúscula y 1 número
        </p>
      </div>
      <div className="w-full flex justify-between items-center bg-lightsecondary rounded h-10 font-secondary p-3">
        <input
          className="w-full"
          type={mostrarConfirmarContrasena ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirmar contraseña"
          required
          minLength="8"
          autoComplete="new-password"
          aria-label="Confirmar contraseña"
        />
        <BotonConIcono
          className="ml-2 cursor-pointer"
          icon={
            mostrarConfirmarContrasena
              ? OcultarContraseniaIcon
              : VerContraseniaIcon
          }
          onClick={toggleMostrarConfirmarContrasena}
          aria-label={
            mostrarConfirmarContrasena
              ? "Ocultar confirmación de contraseña"
              : "Mostrar confirmación de contraseña"
          }
          type="button"
        ></BotonConIcono>
      </div>
      <BotonSimple
        type="submit"
        className="bg-orange font-secondary p-3 rounded shadow-xl w-40 cursor-pointer hover:shadow-none active:bg-light transition delay-50 duration-150 ease-in-out text-white"
      >
        Registrarse
      </BotonSimple>
    </form>
  );
}
export default RegisterForm;
