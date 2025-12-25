import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import ProtectedRoute from './ProtectedRoute';

// Páginas públicas
import Inicio from '../pages/Inicio';
import PaginaError from '../pages/PaginaError';
import FAQs from '../pages/FAQs';

// Feature: Autenticación
import { PaginaLogin, PaginaRegistro, PaginaRecuperacion } from '../features/autenticacion';

// Feature: Dashboard
import { PaginaDashboard } from '../features/dashboard';

// Feature: Configuración de Usuario
import { PaginaConfiguracion } from '../features/configuracion-usuario';

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/recuperar-contrasena" element={<PaginaRecuperacion />} />
        <Route path="/error" element={<PaginaError />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
        <Route path="/faqs" element={<FAQs />} />
      </Route>

      {/* Rutas Privadas */}
      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/configuracion" element={<PaginaConfiguracion />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
