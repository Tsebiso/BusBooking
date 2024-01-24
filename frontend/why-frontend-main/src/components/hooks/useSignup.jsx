import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

export const useSignup = () => {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const toast = useToast()
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  const accountNo = Math.floor(Math.random() * (98765 - 54321 + 1)) + 54321
  let balance = 0.00

  const signup = async (firstName, lastName, email, phoneNumber, userType, password) => {
    setIsLoading(true)
    setError(null)

    console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      userType: userType,
      password: password
    })

    const response = await fetch(`${_url}/api/user/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, phoneNumber, userType, password })
    }).catch((err) => {
      console.log(err)
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      const token = json.token
      if (json) {
        await createAccount(accountNo, balance, token)
      }

      sessionStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'SIGNIN', payload: json })

      setIsLoading(false)
      navigate('/')
    }
  }

  const createAccount = async (accountNo, balance, token) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/account/create-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountNo, balance, token })
    }).catch((err) => {
      console.log(err)
    })
    const account = await response.json()
    sessionStorage.setItem('account', JSON.stringify(account))

    if (!response) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      sessionStorage.setItem('account', JSON.stringify(account))
      setIsLoading(false)
      toast({
        title: 'Account created.',
        description: "We've created your account, Enjoy 😃",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const getAllBuses = async () => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/bus/get-buses`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const buses = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return buses
    }
  }

  return { signup, isLoading, error }
}