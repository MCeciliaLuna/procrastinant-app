import LoginForm from '@/shared/components/LoginForm'
import Title from '@/shared/components/layout/Title'
import {Navigate} from 'react-router-dom'
import {useAuthStore} from '@/stores/authStore'

function PaginaLogin () {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <section aria-labelledby="login-title">
        <Title
          id="login-title"
          level={1}
          className="text-shadow-xs text-shadow-white font-primary text-[2em] text-orange pb-5 pt-5 text-center"
        >
          Ingresá
        </Title>
        <LoginForm />
      </section>
    </div>
  )
}

export default PaginaLogin
