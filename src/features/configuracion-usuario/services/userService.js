import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";
export const getProfile = async () => {
  try {
    console.log("Fetching user profile...");

    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      nombre: "Usuario",
      apellido: "Demo",
      alias: "demo",
      email: "usuario@demo.com",
    };
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw new Error(error.response?.data?.message || "Error al obtener perfil");
  }
};
export const updateProfile = async (userData) => {
  try {
    console.log("Updating user profile:", userData);
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      user: userData,
      message: "Perfil actualizado exitosamente",
    };
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw new Error(
      error.response?.data?.message || "Error al actualizar perfil"
    );
  }
};
export const changePassword = async (currentPassword, newPassword) => {
  try {
    console.log("Changing password...");
    await new Promise((resolve) => setTimeout(resolve, 700));

    return {
      success: true,
      message: "Contraseña actualizada exitosamente",
    };
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw new Error(
      error.response?.data?.message || "Error al cambiar contraseña"
    );
  }
};
export const deleteAccount = async () => {
  try {
    console.log("Deleting user account...");

    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: "Cuenta eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    throw new Error(
      error.response?.data?.message || "Error al eliminar cuenta"
    );
  }
};
