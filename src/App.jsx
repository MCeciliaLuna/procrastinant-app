import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes";
import { useUIStore } from "./stores/uiStore";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { isLoading } = useUIStore();
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

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
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            fontFamily: "inherit",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
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
