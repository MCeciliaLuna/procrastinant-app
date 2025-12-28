import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import Toast from "./shared/components/Toast";
import { useUIStore } from "./stores/uiStore";

function App() {
  const { isLoading } = useUIStore();

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
      <Toast />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
