import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

export const getProfile = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE);

    if (response.data.success && response.data.data?.user) {
      return response.data.data.user;
    }

    return null;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw new Error(error.response?.data?.message || "Error al obtener perfil");
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await apiClient.put(
      API_ENDPOINTS.UPDATE_PROFILE,
      userData
    );

    return response.data;
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    throw new Error(
      error.response?.data?.message || "Error al actualizar perfil"
    );
  }
};

export const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw new Error(
      error.response?.data?.message || "Error al cambiar contraseña"
    );
  }
};

export const deleteAccount = async (password) => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.DELETE_ACCOUNT, {
      data: {
        password,
        confirmacion: "ELIMINAR",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al eliminar cuenta:", error);
    throw new Error(
      error.response?.data?.message || "Error al eliminar cuenta"
    );
  }
};
