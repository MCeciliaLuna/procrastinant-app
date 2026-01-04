import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes";
import { useUIStore } from "./stores/uiStore";
import { useAuthStore } from "./stores/authStore";
import { verifyAuth } from "./features/autenticacion/services/authService";

function App() {
  const { isLoading } = useUIStore();
  const { setUser, logout } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("[App] Verificando autenticación...");
        const result = await verifyAuth();

        console.log("[App] Resultado de verificación:", result);

        if (
          result.success &&
          result.data?.isAuthenticated &&
          result.data?.user
        ) {
          console.log("[App] Usuario autenticado, restaurando sesión");
          setUser(result.data.user);
        } else {
          console.log("[App] No autenticado");
          logout();
        }
      } catch (error) {
        console.error("[App] Error al verificar autenticación:", error);
        logout();
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [setUser, logout]);

  if (isCheckingAuth) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <div className="spinner" aria-hidden="true"></div>
        <span className="sr-only">Verificando sesión...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {isLoading && (
        <div
          className="global-loading"
          role="status"
          aria-live="polite"
          aria-label="Cargando..."
        >
          <div className="spinner" aria-hidden="true"></div>
          <span className="sr-only">Cargando contenido...</span>
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--color-light)",
            color: "var(--color-dark)",
            fontSize: "1rem",
            fontFamily: "inherit",
          },
          success: {
            iconTheme: {
              primary: "var(--color-green)",
              secondary: "var(--color-light)",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
