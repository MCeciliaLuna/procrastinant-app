import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("[ProtectedRoute] isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("[ProtectedRoute] No autenticado, redirigiendo a /");
    return <Navigate to="/" replace />;
  }

  console.log("[ProtectedRoute] Autenticado, mostrando contenido protegido");
  return children;
}

export default ProtectedRoute;
