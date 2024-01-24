import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

export const useLogin = () => {
  let navigate = useNavigate()

  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const _url = 'https://voucher-system-gen.herokuapp.com'

  const getAllUsers = async (token) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/user/get-all/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return json
    }
  }

  const login = async (username, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()
    const customerId = json._id
    console.log({json})

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      sessionStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'SIGNIN', payload: json })

      const token = json.token
      const decode = jwt_decode(token)
      const userObject = JSON.parse(decode.user_details)

      if (userObject.userType === 'user') {
        // GET ACCOUNT BALANCE
        await getUserAccountBalance(customerId)
        setIsLoading(false)
        navigate('/')
      }
      else {
        const allusers = await getAllUsers(token)
        setIsLoading(false)
        navigate('/admin/dashboard', { state: allusers })
      }
    }
  }

  const getUserAccountBalance = async (customerId) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/account/get-balance/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const account = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
      sessionStorage.setItem('account', JSON.stringify(account))
    }
  }

  return { login, isLoading, error }
}