import { useAuthContext } from '../hooks/useAuthContext'
import { useSignout } from '../hooks/useSignout'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import './organisms.css'

const NavbarDashboard = () => {
  
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { signout } = useSignout()
  const handleSignout = () => {
    signout()
    setIsOpen(!isOpen)
  }

  return (
    <nav className='navbar fixed-top-nav'>
      <p className='navbar__logo' onClick={() => navigate(`/admin/dashboard`)}>Bus Booking</p>
      {user && (
        <div className='navbar__content'>
          <ul className='modal-body-list' onClick={handleSignout}><FaSignOutAlt /><span>Logout</span></ul>
        </div>
      )}
    </nav>
  )
}

export default NavbarDashboard