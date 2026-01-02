const TOKEN_KEY = "authToken";

export const saveToken = (token) => {
  if (token) {
    console.log(
      "[TokenManager] Guardando token en localStorage:",
      token.substring(0, 20) + "..."
    );
    try {
      localStorage.setItem(TOKEN_KEY, token);
      console.log("[TokenManager] Token guardado exitosamente");
      const saved = localStorage.getItem(TOKEN_KEY);
      console.log(
        "[TokenManager] Verificación - Token guardado:",
        saved ? "SÍ" : "NO"
      );
    } catch (error) {
      console.error("[TokenManager] Error al guardar token:", error);
    }
  } else {
    console.warn("[TokenManager] Intento de guardar token vacío o nulo");
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) return false;

    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error al verificar expiración del token:", error);
    return true;
  }
};

export const getValidToken = () => {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return token;
};
