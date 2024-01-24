import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useToast } from '@chakra-ui/react'

export const useCreditCard = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const toast = useToast()
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  // CHECK IF CREDIT CARD EXISTS
  const checkCreditCard = async (_id) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${_url}/api/card/get-card/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })
    const crediCard = await response.json()
    console.log({crediCard})

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
      return crediCard
    }
  }

  // CREATE CARD
  const createCard = async (cardNumber, cardName, expiaryDate, cvvNumber) => {
    setIsLoading(true)
    setError(null)
    const token = await user.token

    const response = await fetch(`${_url}/api/card/add-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, cardNumber, cardName, expiaryDate, cvvNumber })
    }).catch((err) => {
      console.log(err)
    })

    const card = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(card.error)
    }

    if (response.ok) {
      setIsLoading(false)
      navigate('/deposit', { state: card })
      toast({
        title: 'Success',
        description: "Card added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  // GET VOUCHER
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
      setError(account.error)
    }

    if (response.ok) {
      setIsLoading(false)
      sessionStorage.setItem('account', JSON.stringify(account))
      return account
    }
  }

  // RECHARGE VOUCHER
  const makeDeposit = async (amount) => {
    setError(null)
    setIsLoading(true)
    const token = user.token

    const response = await fetch(`${_url}/api/deposits/create-deposit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, token })
    }).catch((err) => {
      console.log(err)
    })

    const balance = amount
    const res = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(res.error)
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    }

    if (response.ok) {
      setIsLoading(false)
      toast({
        title: 'Received.',
        description: "Great loaded😎!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

      await rechargeAccount(balance, token)
    }
  }

  const rechargeAccount = async (balance) => {
    setError(null)
    setIsLoading(true)
    const token = user.token

    const response = await fetch(`${_url}/api/account/balance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ balance, token })
    }).catch((err) => {
      console.log(err)
    })

    const res = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      setIsLoading(false)
      const account = await JSON.parse(sessionStorage.getItem('account'))
      account.balance = res.newBalance
      sessionStorage.setItem('account', JSON.stringify(account))
      toast({
        title: 'Amount received.',
        description: "Your Account is succesfully recharged.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/')
    }
  }

  return { checkCreditCard, createCard, makeDeposit, getUserAccountBalance, isLoading, error }
}