import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

export const login = async (email, password) => {
  try {
    console.log("Login intent:", { email });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      user: {
        nombre: "Usuario",
        apellido: "Demo",
        alias: "demo",
        email: email,
      },
      token: "mock-jwt-token-12345",
    };
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};
export const register = async (userData) => {
  try {
    console.log("Register intent:", userData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      user: {
        nombre: userData.nombre,
        apellido: userData.apellido,
        alias: userData.alias || "",
        email: userData.email,
      },
      token: "mock-jwt-token-67890",
    };
  } catch (error) {
    console.error("Error en registro:", error);
    throw new Error(
      error.response?.data?.message || "Error al registrar usuario"
    );
  }
};

export const logout = async () => {
  try {
    console.log("Logout successful");
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error en logout:", error);
  }
};
