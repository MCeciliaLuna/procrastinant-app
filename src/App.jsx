import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import Toast from "./shared/components/Toast";
import { useUIStore } from "./stores/uiStore";

function App() {
  const { isLoading } = useUIStore();

  return (
    <BrowserRouter>
      {/* Global Loading Indicator */}
      {isLoading && (
        <div className="global-loading">
          <div className="spinner"></div>
        </div>
      )}

      {/* Toast Notifications */}
      <Toast />

      {/* Application Routes */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
