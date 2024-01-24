import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"

export const useSignout = () => {
    const { dispatch } = useAuthContext()
    const location = useLocation()
    const navigate = useNavigate()

    const signout = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('account')
        navigate(location.pathname = '/login')
        dispatch({ type: 'SIGNOUT' })
    }

    return { signout }
}