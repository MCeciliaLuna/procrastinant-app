import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import ProtectedRoute from "./ProtectedRoute";
import Inicio from "../pages/Inicio";
import PaginaError from "../pages/PaginaError";
import { PaginaLogin, PaginaRegistro } from "../features/autenticacion";
import { PaginaDashboard } from "../features/dashboard";
import { PaginaConfiguracion } from "../features/configuracion-usuario";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/error" element={<PaginaError />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<PaginaDashboard />} />
          <Route path="/configuracion" element={<PaginaConfiguracion />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
