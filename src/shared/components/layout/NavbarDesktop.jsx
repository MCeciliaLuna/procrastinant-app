import BotonConIcono from '@/shared/components/layout/BotonConIcono'
import LogoApp from '@/shared/components/layout/LogoApp'
import {Link, NavLink} from 'react-router-dom'
import ConfigurationIcon from '@/assets/icons/configuration-icon.svg'
import BotonCerrarSesión from './BotonCerrarSesión'

function NavbarDesktop () {
  return (
    <nav className="bg-lightsecondary saturate-120 flex items-center justify-between py-4 px-6 w-screen h-[10vh] fixed z-50">
      <Link to="/dashboard">
        <LogoApp width="50px" />
      </Link>
      <div className="flex align-center justify-end gap-4 w-100">
        <NavLink
          to="/configuracion"
          className="flex align-center justify-center"
          aria-current={({isActive}) => (isActive ? 'page' : undefined)}
        >
          {({isActive}) => (
            <BotonConIcono
              icon={ConfigurationIcon}
              className="text-dark cursor-pointer font-secondary"
              aria-label="Configuración"
            />
          )}
        </NavLink>
        <div className="w-50">
          <BotonCerrarSesión />
        </div>
      </div>
    </nav>
  )
}

export default NavbarDesktop
