import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { useUIStore } from "../stores/uiStore";
import { API_BASE_URL } from "./env";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    useUIStore.getState().setLoading(true);

    return config;
  },
  (error) => {
    useUIStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    useUIStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useUIStore.getState().setLoading(false);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Sesión expirada o no autenticado");
          useAuthStore.getState().logout();
          break;

        case 403:
          console.error("No tienes permisos para esta acción");
          break;

        case 404:
          console.error("Recurso no encontrado");
          break;

        case 500:
          console.error("Error del servidor. Por favor, intenta más tarde");
          break;

        default:
          console.error(
            "Error en la petición:",
            error.response.data?.message || "Error desconocido"
          );
      }
    } else if (error.request) {
      console.error(
        "No hay respuesta del servidor. Verifica tu conexión a internet"
      );
    } else {
      console.error("Error al configurar la petición:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
