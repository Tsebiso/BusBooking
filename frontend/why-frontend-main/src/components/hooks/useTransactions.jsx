import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useTransactions = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const { user } = useAuthContext()
  const _url = 'https://voucher-system-gen.herokuapp.com'
  // const _url = 'http://localhost:8080'

  const getAllUserTransactions = async () => {
    setLoading(true)
    setError(null)
    const _id = user._id

    const response = await fetch(`${_url}/api/deposits/get-deposit/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })

    const json = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    } else {
      setLoading(false)
      return json
    }
  }

  const getAllCard = async () => {
    setLoading(true)
    setError(null)
    const _id = user._id

    const response = await fetch(`${_url}/api/card/allcards/${_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).catch((err) => {
      console.log(err)
    })

    const cards = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(cards.error)
    } else {
      setLoading(false)
      return cards
    }
  }

  return { getAllUserTransactions, getAllCard, loading, error }
}