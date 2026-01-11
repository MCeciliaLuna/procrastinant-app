import {Routes, Route, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import Loader from '../shared/components/layout/Loader'

const PublicLayout = lazy(() => import('../layouts/PublicLayout'))
const PrivateLayout = lazy(() => import('../layouts/PrivateLayout'))
const ProtectedRoute = lazy(() => import('./ProtectedRoute'))

const Inicio = lazy(() => import('../pages/Inicio'))
const PaginaError = lazy(() => import('../pages/PaginaError'))
const PaginaLogin = lazy(() =>
  import('../features/autenticacion').then((module) => ({
    default: module.PaginaLogin,
  })),
)
const PaginaRegistro = lazy(() =>
  import('../features/autenticacion').then((module) => ({
    default: module.PaginaRegistro,
  })),
)

const PaginaDashboard = lazy(() =>
  import('../features/dashboard').then((module) => ({
    default: module.PaginaDashboard,
  })),
)
const PaginaConfiguracion = lazy(() =>
  import('../features/configuracion-usuario').then((module) => ({
    default: module.PaginaConfiguracion,
  })),
)

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
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
          <Route path="/dashboard" element={<PaginaDashboard />} />
          <Route path="/configuracion" element={<PaginaConfiguracion />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
