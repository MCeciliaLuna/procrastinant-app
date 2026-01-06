import apiClient from "../../../config/axios";
import { API_ENDPOINTS } from "../../../config/constants";

export const login = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);

    return response.data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw new Error(
      error.response?.data?.message || "Error al registrar usuario"
    );
  }
};

export const logout = async () => {
  try {
    await apiClient.post(API_ENDPOINTS.LOGOUT);
  } catch (error) {
    console.error("Error en logout:", error);
  }
};

export const verifyAuth = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.VERIFY_AUTH);
    return response.data;
  } catch (error) {
    console.error("Error en verifyAuth:", error);
    throw new Error(
      error.response?.data?.message || "Error al verificar autenticación"
    );
  }
};
